import React, { createContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Recipe from "components/Recipe";
import Recipes from "pages/Recipes";

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

  const testProps = {
    id: "1234",
    title: "test",
    url: "test",
    tags: ["test"],
  };

  return (
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
    </RecipeContext.Provider>
  );
}

export default App;
