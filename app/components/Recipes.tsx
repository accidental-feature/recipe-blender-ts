"use client";

import React from "react";
import { Recipe } from "./Recipe";
import useStore from "@/utils/store";

export const RecipeList = () => {
  const store = useStore();

  return (
    <div
      className={` ${
        store.recipeListVisible ? "" : "invisible"
      } flex flex-col items-center w-full`}
    >
      <h2 className="font-semibold text-2xl text-center mt-6 mb-4 sm:mb-2">
        You can make:
      </h2>
      <ul className="w-full justify-center">
        {store.recipes.length !== 0 ? (
          store.recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center">
            No recipes found. <br /> Try adding or removing ingredients!
          </p>
        )}
      </ul>
    </div>
  );
};