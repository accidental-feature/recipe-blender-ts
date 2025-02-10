// Form.tsx
import useStore from "@/utils/store";
import { Button } from "./Button";
import { createIngredient } from "@/utils/formatData";
import { useEffect, useRef, useState } from "react";

export const Form = ({blendIngredients}: {blendIngredients: () => void}) => {
  const store = useStore();
  const [error, setError] = useState<string>("");
  const [originalName, setOriginalName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout>(null);
 
  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    store.setIngredientName(event.target.value);
    setError("");
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
  };
 
  const isEditing = store.editingId !== null;
  const hasChanges = isEditing && store.ingredientName !== originalName;
 
  const handleSubmit = () => {
    if (!store.ingredientName.trim()) {
      setError("Please enter an ingredient");
      errorTimeoutRef.current = setTimeout(() => setError(""), 5000);
      return;
    }
 
    if (isEditing) {
      if (!hasChanges) {
        store.setIngredientName("");
        store.setEditingId(null);
        setOriginalName("");
        return;
      }
      
      if(store.editingId) {
        store.updateIngredient(store.editingId, store.ingredientName);
        store.setEditingId(null);
        store.setIngredientName("");
        setOriginalName("");
      }
      return;
    }
 
    const isDuplicate = store.ingredients.some(
      ingredient => ingredient.name.toLowerCase() === store.ingredientName.trim().toLowerCase()
    );
 
    if (isDuplicate) {
      setError("Ingredient already added");
      errorTimeoutRef.current = setTimeout(() => setError(""), 5000);
      return;
    }
 
    createIngredient(store);
    setError("");
    setOriginalName("");
  };
 
  useEffect(() => {
    if (store.editingId && !originalName) {
      const ingredient = store.ingredients.find(i => i.id === store.editingId);
      if (ingredient) {
        setOriginalName(ingredient.name);
      }
    }
  }, [store.editingId]);
 
  const buttonText = isEditing 
    ? (hasChanges ? "Update Ingredient" : "Cancel") 
    : "Add Ingredient";
 
  return (
    <div className="flex flex-col w-full max-w-xl text-gray-700">
      <div className="flex flex-col drop-shadow-md my-3">
        <label htmlFor="ingredientName" className="sr-only">
          Name of the Ingredient
        </label>
        <input
          ref={inputRef}
          id="ingredientName"
          className={`
            p-3 focus:outline-none w-full 
            bg-white
            border-2 border-black rounded-xl
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
            active:shadow-none
            active:translate-x-[4px]
            active:translate-y-[4px]
            transition-all
          `}
          placeholder="Add Ingredient Here"
          value={store.ingredientName}
          onChange={handleIngredientChange}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <p className={`${ error ? 'opacity-100' : 'opacity-0' } text-red-500 text-sm mt-2 transition-opacity duration-300`}>
          {error}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row -mx-3">
        <Button 
          additionalClass={`${error ? 'text-red-500 border-red-500' : ''} sm:flex-1`} 
          text={buttonText}
          onClick={handleSubmit} 
        />
        <Button 
          additionalClass="sm:flex-1"
          text={store.loading ? "Blending..." : "Blend"} 
          onClick={blendIngredients} 
          disabled={store.loading}
        />
      </div>

    </div>
  );
};