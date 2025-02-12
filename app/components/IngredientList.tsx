"use client";

import { Form } from "./Form";
import { Ingredient } from "./Ingredient";

import { createIngredient } from "@/utils/formatData";
import useStore from "@/utils/store";
import { useRef } from "react";

export const IngredientList = () => {
  const store = useStore();
  const prevIngredients = useRef<Ingredient[]>([]);

  const handleSubmit = () => {
    const currentIngredients = store.ingredients;
    const hasIngredientsChanged = currentIngredients.length !== prevIngredients.current.length || 
      !currentIngredients.every((ingredient, index) => 
        ingredient.id === prevIngredients.current[index].id && 
        ingredient.name === prevIngredients.current[index].name
      );

    if (hasIngredientsChanged && currentIngredients.length > 0) {
      createIngredient(store);
      store.fetchRecipes();
      prevIngredients.current = [...currentIngredients];
    }
  };

  return (
    <div className="mt-10 flex flex-col w-full items-center">
      <div className="flex flex-wrap justify-center gap-1 max-w-[24rem] sm:max-w-[32rem] mb-4">
        {store.ingredients.map((ingredient, index) => (
          <Ingredient key={index} ingredient={ingredient} />
        ))}
      </div>
      
      <Form blendIngredients={handleSubmit} />
    </div>
  );
};