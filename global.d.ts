interface Ingredient {
  id: string;
  name: string;
}

type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  instructions: any[];
  usedIngredients: Ingredient[];
  missedIngredients: Ingredient[];
};

interface Store {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  recipeListVisible: boolean;
  makeRecipeListVisible: () => void;
  ingredientName: string;
  ingredientAmount: number;
  setIngredientName: (name: string) => void;
  setIngredientAmount: (amount: number) => void;
  resetIngredientForm: () => void;
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  deleteIngredient: (id: string) => void;
  fetchRecipes: () => Promise<void>;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  updateIngredient: (id: string, name: string) => void;
  loading: boolean;
}