import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import BASE_URL from "./config"; // Import the base URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"

  // Fetch todos from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/todos/`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add new To-Do
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(`${BASE_URL}api/todos/`, {
        title: newTodo,
        completed: false,
      });

      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle To-Do Completed
  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`${BASE_URL}api/todos/${id}/`, { completed: !completed });
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Enable Edit Mode
  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditedTitle(todo.title);
  };

  // Save Edited To-Do
  const saveEdit = async (id) => {
    if (!editedTitle.trim()) return;

    try {
      await axios.patch(`${BASE_URL}api/todos/${id}/`, { title: editedTitle });
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, title: editedTitle } : todo)));
      setEditingTodo(null);
      setEditedTitle("");
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Delete To-Do
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}api/todos/${id}/`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Filter To-Dos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // Show All
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📌 My To-Do List</h2>

      {/* Input for adding new To-Do */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new to-do..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          ➕ Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-3 text-center">
        <button className={`btn me-2 ${filter === "all" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setFilter("all")}>
          Show All
        </button>
        <button className={`btn me-2 ${filter === "completed" ? "btn-success" : "btn-outline-success"}`} onClick={() => setFilter("completed")}>
          ✅ Completed
        </button>
        <button className={`btn ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`} onClick={() => setFilter("pending")}>
          ⏳ Pending
        </button>
      </div>

      {/* Displaying Filtered To-Do List */}
      <ul className="list-group">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? "list-group-item-success" : ""}`}>
            {/* If editing, show input field */}
            {editingTodo === todo.id ? (
              <input
                type="text"
                className="form-control"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            )}

            <div>
              {editingTodo === todo.id ? (
                <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(todo.id)}>
                  💾 Save
                </button>
              ) : (
                <>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(todo)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-success btn-sm me-2" onClick={() => toggleComplete(todo.id, todo.completed)}>
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                </>
              )}
              <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
