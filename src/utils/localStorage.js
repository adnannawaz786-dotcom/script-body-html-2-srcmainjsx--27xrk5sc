// Local storage utilities for todo app

const STORAGE_KEY = 'todos';

/**
 * Get todos from localStorage
 * @returns {Array} Array of todos or empty array if none exist
 */
export const getTodosFromStorage = () => {
  try {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error reading todos from localStorage:', error);
    return [];
  }
};

/**
 * Save todos to localStorage
 * @param {Array} todos - Array of todo objects to save
 * @returns {boolean} Success status
 */
export const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
    return false;
  }
};

/**
 * Add a single todo to localStorage
 * @param {Object} todo - Todo object to add
 * @returns {Array} Updated todos array
 */
export const addTodoToStorage = (todo) => {
  try {
    const existingTodos = getTodosFromStorage();
    const updatedTodos = [...existingTodos, todo];
    saveTodosToStorage(updatedTodos);
    return updatedTodos;
  } catch (error) {
    console.error('Error adding todo to localStorage:', error);
    return getTodosFromStorage();
  }
};

/**
 * Update a todo in localStorage
 * @param {string} id - Todo ID to update
 * @param {Object} updates - Object with updated properties
 * @returns {Array} Updated todos array
 */
export const updateTodoInStorage = (id, updates) => {
  try {
    const existingTodos = getTodosFromStorage();
    const updatedTodos = existingTodos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    saveTodosToStorage(updatedTodos);
    return updatedTodos;
  } catch (error) {
    console.error('Error updating todo in localStorage:', error);
    return getTodosFromStorage();
  }
};

/**
 * Delete a todo from localStorage
 * @param {string} id - Todo ID to delete
 * @returns {Array} Updated todos array
 */
export const deleteTodoFromStorage = (id) => {
  try {
    const existingTodos = getTodosFromStorage();
    const updatedTodos = existingTodos.filter(todo => todo.id !== id);
    saveTodosToStorage(updatedTodos);
    return updatedTodos;
  } catch (error) {
    console.error('Error deleting todo from localStorage:', error);
    return getTodosFromStorage();
  }
};

/**
 * Clear all todos from localStorage
 * @returns {boolean} Success status
 */
export const clearAllTodosFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
    return false;
  }
};

/**
 * Get todos count from localStorage
 * @returns {Object} Object with total, completed, and pending counts
 */
export const getTodosCountFromStorage = () => {
  try {
    const todos = getTodosFromStorage();
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    return { total, completed, pending };
  } catch (error) {
    console.error('Error getting todos count from localStorage:', error);
    return { total: 0, completed: 0, pending: 0 };
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};

/**
 * Export todos data as JSON string
 * @returns {string} JSON string of all todos
 */
export const exportTodosData = () => {
  try {
    const todos = getTodosFromStorage();
    return JSON.stringify(todos, null, 2);
  } catch (error) {
    console.error('Error exporting todos data:', error);
    return '[]';
  }
};

/**
 * Import todos data from JSON string
 * @param {string} jsonData - JSON string of todos data
 * @returns {boolean} Success status
 */
export const importTodosData = (jsonData) => {
  try {
    const todos = JSON.parse(jsonData);
    if (Array.isArray(todos)) {
      saveTodosToStorage(todos);
      return true;
    } else {
      console.error('Invalid todos data format');
      return false;
    }
  } catch (error) {
    console.error('Error importing todos data:', error);
    return false;
  }
};

/**
 * Get todos by status from localStorage
 * @param {boolean} completed - Filter by completion status
 * @returns {Array} Filtered todos array
 */
export const getTodosByStatusFromStorage = (completed) => {
  try {
    const todos = getTodosFromStorage();
    return todos.filter(todo => todo.completed === completed);
  } catch (error) {
    console.error('Error filtering todos by status:', error);
    return [];
  }
};

/**
 * Search todos by text from localStorage
 * @param {string} searchText - Text to search for
 * @returns {Array} Filtered todos array
 */
export const searchTodosInStorage = (searchText) => {
  try {
    const todos = getTodosFromStorage();
    const lowercaseSearch = searchText.toLowerCase();
    return todos.filter(todo =>
      todo.text?.toLowerCase().includes(lowercaseSearch) ||
      todo.title?.toLowerCase().includes(lowercaseSearch) ||
      todo.description?.toLowerCase().includes(lowercaseSearch)
    );
  } catch (error) {
    console.error('Error searching todos:', error);
    return [];
  }
};