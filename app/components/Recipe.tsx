import Link from "next/link";
import React from "react";
import { Button } from "./Button";
import ProgressCircle from "./ProgressCircle";

interface RecipeProps {
  recipe: Recipe;
}

export const Recipe = ({
  recipe: { title, image, readyInMinutes, usedIngredients, missedIngredients, sourceUrl },
}: RecipeProps) => {
  const totalIngredients = usedIngredients.length + missedIngredients.length;
  const percentComplete = (usedIngredients.length / totalIngredients) * 100;

  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <div className="bg-white border-2 border-black rounded-xl p-4
        shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
        transition-all"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="font-bold text-lg mr-1.5 hover:underline">
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{title}</a></h2>
            <p className="text-gray-500 text-sm">
              <strong>{missedIngredients.length > 0  && missedIngredients.length} Missing Ingredients:</strong> {missedIngredients.slice(0, 3).map(i => i.name).join(", ") + (missedIngredients.length > 3 ? "..." : "")}
            </p>
          </div>
          <ProgressCircle percentage={percentComplete} />
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readyInMinutes} minutes
          </div>
        </div>
      </div>
    </div>
  );
};