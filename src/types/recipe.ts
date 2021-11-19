export type Recipe = {
  id: string;
  title: string;
  description: string | null;
  ingredients: string[];
  method: string[];
};
