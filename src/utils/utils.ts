export async function fetchRecipes() {
  const response = await fetch("api/recipes");
  const data = await response.json();
  return data.data;
}

export function prepareTags(tags: string) {
  return tags
    .split(/[,\r\n]/)
    .filter((tag: string) => tag.trim() !== "")
    .map((tag) => tag.toLowerCase());
}
