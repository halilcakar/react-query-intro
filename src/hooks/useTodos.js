import { useQuery, useMutation, useQueryClient } from "react-query";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../api/todosApi";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    isError,
    data: todos,
  } = useQuery("todos", getTodos, {
    select: (data) => [...data].reverse(),
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return {
    isLoading,
    error,
    isError,
    todos,
    addTodo: addTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
  };
};
