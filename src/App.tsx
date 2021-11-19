import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Container,
  Grid,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Recipe from "./components/Recipe";
import RecipeCard from "./components/RecipeCard";
import { Recipe as RecipeType } from "./types/recipe";
import AddRecipe from "./components/AddRecipe";

function App() {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    const recipeState = localStorage.getItem("recipes");

    if (recipeState) {
      setRecipes(JSON.parse(recipeState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

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
    <Container
      maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg" }}
      centerContent
    >
      <Button
        size="lg"
        leftIcon={<AddIcon />}
        onClick={onOpen}
        colorScheme="blue"
      >
        New Recipe
      </Button>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        w="100%"
        gap={3}
      >
        {recipes.map((recipe: any) => (
          <RecipeCard {...recipe} deleteRecipe={deleteRecipe} />
        ))}
      </Grid>

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
    </Container>
  );
}

export default App;
