import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { RecipeContext } from "AuthenticatedApp";

import { Recipe } from "../types/recipe";

import { fetchRecipes } from "utils/utils";
export default function useCrud() {
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

  async function deleteRecipe(recipeIdToDelete: string) {
    try {
      const response = await fetch(`/api/recipes/${recipeIdToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecipes(await fetchRecipes());
      }
    } catch (error: any) {
      toast({
        title: "Failed to delete recipe.",
        description: "Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return { saveOrEditRecipe, deleteRecipe };
}
