export async function fetchRecipes() {
  const response = await fetch("api/recipes");
  const data = await response.json();
  return data.data;
}
