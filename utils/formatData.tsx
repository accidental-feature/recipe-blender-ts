// utils/formatData.ts
import { v4 as uuidv4 } from "uuid";

const fillerWords = [
  "and",
  "or",
  "the",
  "a",
  "an",
  "of",
  "in",
  "on",
  "to",
  "with",
  "without",
  "for",
  "by",
  "at",
  "as",
  "so",
  "such",
  "if",
  "then",
  "but",
  "like",
  "just",
  "only",
  "also",
  "within",
  "into",
  "upon",
  "per",
];

export const formatData = (data: any) =>
  data.map((recipe: any) => {
    return {
      id: recipe.id,
      title: capitalize(recipe.title),
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      sourceUrl: recipe.sourceUrl,
      summary: recipe.summary,
      instructions: recipe.analyzedInstructions,
      usedIngredients: recipe.usedIngredients.map((ingredient: any) => {
        return {
          id: ingredient.id.toString(),
          name: capitalize(ingredient.name),
        };
      }),
      missedIngredients: recipe.missedIngredients.map((ingredient: any) => {
        return {
          id: ingredient.id.toString(),
          name: capitalize(ingredient.name),
        };
      }),
    };
});

const capitalize = (str: string) =>
  str
    .split(" ")
    .map((word) => {
      if (!fillerWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(" ");

export const createIngredient = (store: Store): Ingredient | undefined => {
  const ingredientNameTrimmed: string = store.ingredientName.trim();
  if (!ingredientNameTrimmed) {
    return;
  }

  const newIngredient = {
    id: uuidv4(),
    name: ingredientNameTrimmed,
  };

  store.addIngredient(newIngredient);
  store.resetIngredientForm();
};