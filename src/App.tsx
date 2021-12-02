import React, { createContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Recipes from "pages/Recipes";
import { fetchRecipes } from "utils/utils";

export const RecipeContext = createContext<any>(null);

function App() {
  const [recipes, setRecipes] = useState<any>([]);

  const value = { recipes, setRecipes };
  useEffect(() => {
    async function appLoad() {
      setRecipes(await fetchRecipes());
    }
    appLoad();
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
          {/* <Route
            path="/recipes/:recipeId"
            element={<Recipe {...testProps} />}
          /> */}
        </Routes>
      </Router>
    </RecipeContext.Provider>
  );
}

export default App;
