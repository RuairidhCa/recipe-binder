export async function fetchRecipes() {
  const response = await fetch("api/recipes");
  const data = await response.json();
  return data.data;
}

export function prepareTags(tags: string) {
  return tags
    .split(/[,\r\n]/)
    .map((tag) => tag.toLowerCase().trim())
    .filter((tag) => tag !== "");
}

export function prepareUrl(url: string) {
  return (url.startsWith("http") ? url : `http://${url}`).trim();
}
