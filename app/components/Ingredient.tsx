import useStore from "@/utils/store";

type IngredientProps = {
  ingredient: Ingredient;
};

// Ingredient.tsx
export const Ingredient = ({ ingredient: { id, name } }: IngredientProps) => {
  const store = useStore();
 
  return (
    <button
      className={`group m-1 
        text-sm bg-accent
        border border-primary rounded-xl
        shadow-[1px_1px_0px_0px_rgba(2,71,57,1)]
        hover:shadow-[0px_0px_0px_0px_rgba(2,71,57,1)]
        transition-all grid grid-cols-[1fr,auto]
        ${store.editingId === id ? 'bg-gray-200' : ''}
      `}
      onClick={() => {
        store.setIngredientName(name);
        store.setEditingId(id);
      }}
    >
      <span className="px-3 py-1.5 text-center">{name}</span>
      <span 
        className="px-2 h-full hidden items-center group-hover:flex rounded-r-xl hover:bg-red-500"
        onClick={(e) => {
          e.stopPropagation();
          store.deleteIngredient(id);
          if (store.editingId === id) {
            store.setEditingId(null);
            store.setIngredientName('');
          }
        }}
      >×</span>
    </button>
  );
};