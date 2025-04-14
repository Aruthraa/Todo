import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log('Error fetching todos:', err));
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const response = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }),
    });

    const savedTodo = await response.json();
    setTodos([...todos, savedTodo]);
    setNewTodo('');
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📝 My Todo App</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          placeholder="Enter a task..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} style={{ marginLeft: '10px' }}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: '10px' }}>
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
