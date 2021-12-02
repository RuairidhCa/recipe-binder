import React, { useContext } from "react";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button, Textarea } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { RecipeContext } from "App";
import { fetchRecipes, prepareTags } from "../utils/utils";
interface IRecipeFormProps {
  onClose: () => void;
  recipe?: Recipe;
}
function RecipeForm({ onClose, recipe }: IRecipeFormProps) {
  const { setRecipes } = useContext(RecipeContext);

  async function saveOrEditRecipe(recipe: Recipe) {
    const path = recipe.id ? `/${recipe.id}` : "";
    await fetch(`/api/recipes${path}`, {
      method: recipe.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    setRecipes(await fetchRecipes());
  }
  function handleSubmit(event: any) {
    event.preventDefault();

    const { title, url, tags } = event.target.elements;

    saveOrEditRecipe({
      id: recipe?.id,
      title: title.value,
      url: url.value,
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
