import { useState, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    if (!text.trim()) return;
    
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Edit todo text
  const editTodo = (id, newText) => {
    if (!newText.trim()) {
      deleteTodo(id);
      return;
    }
    
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  // Toggle all todos completion status
  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allCompleted }))
    );
  };

  // Get filtered todos based on current filter
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // Get todos statistics
  const getStats = () => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;
    
    return {
      total: totalTodos,
      completed: completedTodos,
      active: activeTodos,
      completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
    };
  };

  // Search todos
  const searchTodos = (searchTerm) => {
    if (!searchTerm.trim()) return getFilteredTodos();
    
    return getFilteredTodos().filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    getFilteredTodos,
    getStats,
    searchTodos,
  };
};

export default useTodos;