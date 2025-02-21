"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Todo[];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openEditDialog = (todo: Todo) => {
    setCurrentTodo(todo);
    setEditText(todo.text);
    setEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (currentTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === currentTodo.id ? { ...todo, text: editText } : todo
        )
      );
      setEditDialogOpen(false);
    }
  };

  return (
    <div className="py-8 px-4 w-full sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white border p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          TODO List
        </h1>
        <div className="flex mb-4">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </Button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white p-4 rounded-lg shadow mb-2 flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span
                  className={`text-gray-700 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => openEditDialog(todo)}
                  className="text-sm text-blue-500 hover:text-blue-700 bg-white hover:bg-white focus:outline-none"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-sm text-red-500 hover:text-red-700 bg-white hover:bg-white focus:outline-none"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="mt-4"
            />
            <DialogFooter>
              <Button
                onClick={() => setEditDialogOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={saveEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TodoList;
