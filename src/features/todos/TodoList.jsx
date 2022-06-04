import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useTodos } from "../../hooks/useTodos";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const { isLoading, error, isError, todos, addTodo, deleteTodo, updateTodo } =
    useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo.mutate({
      userId: 1,
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
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
    content = <p>Error: {error.message}</p>;
  } else {
    content = todos.map((todo) => (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={() =>
              updateTodo.mutate({
                ...todo,
                completed: !todo.completed,
              })
            }
          />
          <label htmlFor={todo.id}>{todo.title}</label>
        </div>
        <button
          className="trash"
          onClick={() => deleteTodo.mutate({ id: todo.id })}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </article>
    ));
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
