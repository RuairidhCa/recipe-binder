import React, { useContext, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import RecipeCard from "components/RecipeCard";
import { Recipe as RecipeType } from "types/recipe";
import AddRecipe from "components/AddRecipe";
import { RecipeContext } from "App";
function Recipes() {
  const { recipes, setRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const recipeState = localStorage.getItem("recipes");

    if (recipeState) {
      setRecipes(JSON.parse(recipeState));
    }
  }, [setRecipes]);

  function saveRecipe(recipe: RecipeType) {
    setRecipes([...recipes, recipe]);
    onClose();
  }

  function deleteRecipe(recipeIdToDelete: string) {
    const filteredRecipes = recipes.filter(
      (recipe: RecipeType) => recipe.id !== recipeIdToDelete
    );
    setRecipes(filteredRecipes);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="lg"
        leftIcon={<AddIcon />}
        onClick={onOpen}
        colorScheme="blue"
      >
        New Recipe
      </Button>

      <SimpleGrid minChildWidth="200px" spacing={3}>
        {recipes.map((recipe: any) => (
          <RecipeCard {...recipe} deleteRecipe={deleteRecipe} />
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddRecipe onSubmit={saveRecipe} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Recipes;
