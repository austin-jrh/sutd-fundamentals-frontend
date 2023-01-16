import { useQuery } from "react-query";
import Button from "./Button";
import Spinner from "./Spinner";
import { fetchRecipe } from "../queries";
import React from "react";

export default function Recipe({ activeRecipe, setActiveRecipe }) {
  const { data, isFetching } = useQuery(
    ["Recipe", { id: activeRecipe }],
    fetchRecipe
  );

  return (
    <>
      <Button onClick={() => setActiveRecipe(null)}>Back</Button>
      <h2>
        ID: {activeRecipe} {isFetching ? <Spinner /> : null}
      </h2>
      {data ? (
        <div>
          <p>Title: {data.title}</p>
          <p>Content: {data.content}</p>
        </div>
      ) : null}
    </>
  );
}
