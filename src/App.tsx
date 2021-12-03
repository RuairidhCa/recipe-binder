import { createContext, useEffect, useState } from "react";

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

  return (
    <RecipeContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<Recipes />} />
        </Routes>
      </Router>
    </RecipeContext.Provider>
  );
}

export default App;
