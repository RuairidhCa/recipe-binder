import React, { createContext, useEffect, useState } from "react";

import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Recipe from "components/Recipe";
import Recipes from "pages/Recipes";

export const RecipeContext = createContext<any>(null);

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

  const testProps = {
    id: "1234",
    title: "test",
    url: "test",
    tags: ["test"],
  };

  return (
    <Container
      maxW={{ sm: "container.sm", md: "container.md", lg: "container.lg" }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route
            path="/recipes/:recipeId"
            element={<Recipe {...testProps} />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
