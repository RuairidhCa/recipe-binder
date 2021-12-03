import React, { useContext } from "react";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button, Textarea, useToast } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { RecipeContext } from "App";
import { fetchRecipes, prepareTags, prepareUrl } from "../utils/utils";
interface IRecipeFormProps {
  onClose: () => void;
  recipe?: Recipe;
}

function RecipeForm({ onClose, recipe }: IRecipeFormProps) {
  const { setRecipes } = useContext(RecipeContext);
  const toast = useToast();

  async function saveOrEditRecipe(recipe: Recipe) {
    try {
      const path = recipe.id ? `/${recipe.id}` : "";
      const response = await fetch(`/api/recipes${path}`, {
        method: recipe.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      if (response.ok) {
        setRecipes(await fetchRecipes());
      }
    } catch (error: any) {
      toast({
        title: "Failed to save recipe.",
        description: "Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  function handleSubmit(event: any) {
    event.preventDefault();

    const { title, url, tags } = event.target.elements;

    saveOrEditRecipe({
      id: recipe?.id,
      title: title.value.trim(),
      url: prepareUrl(url.value),
      tags: prepareTags(tags.value),
    });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Recipe Title" defaultValue={recipe?.title} />
      </FormControl>
      <FormControl id="url" isRequired>
        <FormLabel>URL</FormLabel>
        <Input
          placeholder="Link to Recipe"
          defaultValue={recipe?.url || undefined}
        />
      </FormControl>
      <FormControl id="tags">
        <FormLabel>Tags</FormLabel>
        <Textarea defaultValue={recipe?.tags.join("\r\n")} />
      </FormControl>

      <Button colorScheme="blue" type="submit" mt="3">
        Save
      </Button>
    </form>
  );
}

export default RecipeForm;
