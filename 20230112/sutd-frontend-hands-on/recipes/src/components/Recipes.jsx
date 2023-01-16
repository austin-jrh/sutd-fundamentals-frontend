import { useQuery, queryCache } from "react-query";
import Button from "./Button";
import { fetchRecipes, fetchRecipe } from "../queries";
import React from "react";

export default function Recipes({ setActiveRecipe }) {
  // use react query hook first
  const { data, isFetching } = useQuery("Recipe", fetchRecipes);

  return (
    <div>
      <h2>
        Recipes List <br />
        {isFetching ? (
          "Loading"
        ) : (
          <Button
            onClick={() => {
              queryCache.refetchQueries("Recipes");
            }}
          >
            Refresh Recipes
          </Button>
        )}
      </h2>

      {data.map((Recipe) => (
        <p key={Recipe.Title}>
          <Button
            onClick={() => {
              // prefetch the recipe query
              queryCache.prefetchQuery(
                ["Recipe", { id: Recipe.id }],
                fetchRecipe
              );
              setActiveRecipe(Recipe.id);
            }}
          >
            Load Recipe
          </Button>{" "}
          {Recipe.title}
        </p>
      ))}
    </div>
  );
}
