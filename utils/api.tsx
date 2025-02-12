// utils/api.ts
import { decrypt } from "./crypto"
import { RECIPES_ENDPOINT } from "./routes"

export const getRecipesFromIngredients = async (
  ingredients: string
): Promise<Recipe[]> => {
  if (!ingredients) return Promise.resolve([])
  
  const response = await fetch(`${RECIPES_ENDPOINT}?ingredients=${encodeURIComponent(ingredients)}`)
  if (!response.ok) throw new Error('Failed to fetch recipes')
  
  const { data } = await response.json()
  const decrypted = decrypt(data)
  return JSON.parse(decrypted)
}