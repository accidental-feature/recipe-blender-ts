// utils/api.ts
import { RECIPES_ENDPOINT } from "./routes"

export const getRecipesFromIngredients = async (
  ingredients: string
): Promise<Recipe[]> => {
  if (!ingredients) return Promise.resolve([])
  
  const response = await fetch(`${RECIPES_ENDPOINT}?ingredients=${encodeURIComponent(ingredients)}`)
  if (!response.ok) throw new Error('Failed to fetch recipes')
  
  return response.json()
}