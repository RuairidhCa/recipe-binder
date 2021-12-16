export async function fetchRecipes() {
  const response = await fetch(process.env.REACT_APP_API_URL + "/api/recipes");
  const data = await response.json();
  return data.data;
}

export function prepareTags(tags: string): string[] {
  return Array.from(
    new Set(
      tags
        .split(/[,\r\n]/)
        .map((tag) => tag.toLowerCase().trim())
        .filter((tag) => tag !== "")
    )
  );
}

export function prepareUrl(url: string): string {
  return (url.startsWith("http") ? url : `http://${url}`).trim();
}
