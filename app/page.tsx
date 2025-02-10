import React from "react";
import { IngredientList } from "./components/IngredientList";
import { RecipeList } from "./components/Recipes";
import { Outfit } from "next/font/google";
const outfit = Outfit({ weight: ["500", "700"], subsets: ["latin"] });


export default function Home() {
  return (
    <main className="flex flex-col justify-around min-h-screen px-5">
      <div className="flex flex-1 flex-col align-middle h-fill">
        <h1
          className={`${outfit.className} text-5xl sm:text-7xl pt-20 pb-10 flex text-center justify-center`}
        >
          Recipe Blender
        </h1>
        <div className="flex-1">
          <IngredientList />
          <RecipeList />
        </div>
        <footer className={`${outfit.className} min-w-full text-center text-sm text-black`}>
          <a href="https://kijana.dev">
            I was hungry and made this. KJ Richmond {new Date().getFullYear()}
          </a>
        </footer>
      </div>
    </main>
  );
}