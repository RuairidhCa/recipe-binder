import React, { createContext, useEffect, useState } from "react";

import {
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Recipe from "components/Recipe";
import AddRecipe from "components/AddRecipe";
import Recipes from "pages/Recipes";
import { Recipe as RecipeType } from "./types/recipe";

export const RecipeContext = createContext<any>(null);

function App() {
  const [recipes, setRecipes] = useState<any>([]);
  const value = { recipes, setRecipes };
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
  const testProps = {
    id: "1234",
    title: "test",
    description: "test",
    ingredients: ["test"],
    method: ["test"],
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container
      maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg" }}
    >
      <RecipeContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route
              path="/recipes/:recipeId"
              element={<Recipe {...testProps} />}
            />
          </Routes>
        </Router>

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
      </RecipeContext.Provider>
    </Container>
  );
}

export default App;
