import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, X, Edit2, Trash2, Calendar, Filter, Search } from 'lucide-react'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([todo, ...todos])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEditing = (id, text) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = (id) => {
    if (editText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === 'active') return !todo.completed && matchesSearch
    if (filter === 'completed') return todo.completed && matchesSearch
    return matchesSearch
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Todo App
          </h1>
          <p className="text-white/70 text-lg">
            Stay organized with style
          </p>
        </motion.div>

        {/* Add Todo Form */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-xl"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new todo..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTodo}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl px-6 py-3 font-medium transition-all duration-200 shadow-lg"
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search todos..."
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map((filterType) => (
                <motion.button
                  key={filterType}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
                    filter === filterType
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {filterType}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-xl"
        >
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span className="font-medium">Total: {todos.length}</span>
            </div>
            <div className="flex gap-6">
              <span className="text-blue-300">Active: {activeCount}</span>
              <span className="text-green-300">Completed: {completedCount}</span>
            </div>
          </div>
        </motion.div>

        {/* Todo List */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl"
        >
          <AnimatePresence>
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 text-white/50"
              >
                <Filter size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  {searchTerm ? 'No todos match your search' : 'No todos yet. Add one above!'}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className={`backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 transition-all duration-200 ${
                      todo.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/30 hover:border-green-400'
                        }`}
                      >
                        {todo.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </motion.button>

                      <div className="flex-1">
                        {editingId === todo.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                              autoFocus
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => saveEdit(todo.id)}
                              className="text-green-400 hover:text-green-300 p-1"
                            >
                              <Check size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={cancelEdit}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X size={16} />
                            </motion.button>
                          </div>
                        ) : (
                          <span
                            className={`text-white transition-all duration-200 ${
                              todo.completed ? 'line-through text-white/50' : ''
                            }`}
                          >
                            {todo.text}
                          </span>
                        )}
                      </div>

                      {editingId !== todo.id && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEditing(todo.id, todo.text)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App