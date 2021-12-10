import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { RecipeContext } from "AuthenticatedApp";

import { Recipe } from "../types/recipe";

import { fetchRecipes } from "utils/utils";
import { useAuth } from "context/authContext";
export default function useCrud() {
  const { setRecipes } = useContext(RecipeContext);
  const { user } = useAuth();
  const toast = useToast();

  async function saveOrEditRecipe(recipe: Recipe) {
    try {
      const url = recipe.id ? `/api/recipes/${recipe.id}` : "/api/recipes";
      const response = await fetch(`${url}`, {
        method: recipe.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user ? `Bearer ${user?.token}` : "",
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
        headers: {
          Authorization: user ? `Bearer ${user?.token}` : "",
        },
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
