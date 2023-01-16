import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todoApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todos, // Rename the cache data as todos
  } = useQuery("todos", getTodos, {
    select: (data) => data.sort((a, b) => b.id - a.id),
    retry: 2,
    onError: (error) => {
      console.log(`Error has happened ${error.message}`);
    },
  }); // Create a cache called "todos"

  const addTodoMutation = useMutation(addTodo, {
    // update the cache "todos"
    onSuccess: () => {
      // invalidate the todos cache, and trigger a refresh
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    // update the cache "todos"
    onSuccess: () => {
      // invalidate the todos cache, and trigger a refresh
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    // update the cache "todos"
    onSuccess: () => {
      // invalidate the todos cache, and trigger a refresh
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // dont want the form to reload the page
    // it's called during POST
    addTodoMutation.mutate({
      userId: 1,
      title: newTodo,
      completed: false,
    });
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                // to update
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                });
              }}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>

          <button
            className="trash"
            onClick={() => {
              // to delete
              deleteTodoMutation.mutate({ id: todo.id });
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
