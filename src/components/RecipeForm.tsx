import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button, Textarea } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { RecipeContext } from "App";
import { fetchRecipes } from "../utils/utils";
interface IRecipeFormProps {
  onClose: () => void;
  recipe?: Recipe;
}
function RecipeForm({ onClose, recipe }: IRecipeFormProps) {
  const { setRecipes } = useContext(RecipeContext);

  async function saveRecipe(recipe: Recipe) {
    await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    setRecipes(await fetchRecipes());
  }

  async function editRecipe(editedRecipe: Recipe) {
    await fetch(`/api/recipes/${editedRecipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipe),
    });

    setRecipes(await fetchRecipes());
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const { title, url, tags } = event.target.elements;
    if (recipe?.id) {
      editRecipe({
        id: recipe.id,
        title: title.value,
        url: url.value,
        tags: tags.value.split(/[,\r\n]/),
      });
    } else {
      saveRecipe({
        id: uuidv4(),
        title: title.value,
        url: url.value,
        tags: tags.value.split(/[,\r\n]/),
      });
    }

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
