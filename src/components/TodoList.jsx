import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, Edit3, X } from 'lucide-react'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header with glassmorphism */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Todo List</h1>
        <p className="text-white/70">
          {totalCount === 0 
            ? "No tasks yet. Add one below!" 
            : `${completedCount} of ${totalCount} tasks completed`
          }
        </p>
      </motion.div>

      {/* Add Todo Input */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 mb-6 border border-white/20 shadow-xl"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTodo)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTodo}
            className="px-6 py-3 bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-xl font-medium hover:from-blue-600/80 hover:to-purple-700/80 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border border-white/20"
          >
            <Plus size={20} />
            Add
          </motion.button>
        </div>
      </motion.div>

      {/* Todo Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <AnimatePresence mode="popLayout">
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              variants={itemVariants}
              layout
              exit="exit"
              className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleComplete(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    todo.completed
                      ? 'bg-green-500/80 border-green-500/80'
                      : 'border-white/40 hover:border-white/60'
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

                {/* Todo Text */}
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      className="w-full px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`text-white transition-all duration-200 ${
                        todo.completed
                          ? 'line-through opacity-60'
                          : 'opacity-90'
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {editingId === todo.id ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={saveEdit}
                        className="p-2 text-green-400 hover:text-green-300 transition-colors"
                      >
                        <Check size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cancelEdit}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X size={16} />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit3 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {todos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-white/80 mb-2">No tasks yet</h3>
            <p className="text-white/60">Add your first task above to get started!</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TodoList