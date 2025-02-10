import { create } from "zustand";
import { getRecipesFromIngredients } from "./api";

const useStore = create<Store>((set, get) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  recipeListVisible: false,
  makeRecipeListVisible: () => set({ recipeListVisible: true }),
  ingredientName: "",
  ingredientAmount: 1,
  editingId: null as string | null,
  setEditingId: (id: string | null) => set({ editingId: id }),
  setIngredientName: (name) => set({ ingredientName: name }),
  setIngredientAmount: (amount) => set({ ingredientAmount: amount }),
  resetIngredientForm: () => set({ 
    ingredientName: "", 
    ingredientAmount: 1,
    editingId: null 
  }),
  ingredients: [],
  loading: false,
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  deleteIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    })),
  updateIngredient: (id: string, name: string) =>
    set((state) => ({
      ingredients: state.ingredients.map(ingredient => 
        ingredient.id === id 
          ? { ...ingredient, name }
          : ingredient
      )
    })),
    fetchRecipes: async () => {
      set({ loading: true });
      const ingredients = get()
        .ingredients.map((ingredient) => ingredient.name)
        .join(", ");
      try {
        const recipes = await getRecipesFromIngredients(ingredients);
        set({ recipes, recipeListVisible: true });
      } catch (error) {
        set({ recipes: [], recipeListVisible: true });
      } finally {
        set({ loading: false });
      }
    }
 }));

export default useStore;