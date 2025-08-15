import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useTodos } from '../hooks/useTodos'

const AddTodo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const { addTodo } = useTodos()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString()
      })
      setTitle('')
      setDescription('')
      setPriority('medium')
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setPriority('medium')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Add Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Plus className="w-5 h-5" />
        Add New Todo
      </motion.button>

      {/* Modal Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
        >
          {/* Modal Content */}
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Add New Todo</h2>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter todo title..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description (optional)..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Priority Selection */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setPriority(level)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        priority === level
                          ? level === 'high'
                            ? 'bg-red-500/30 border border-red-400/50 text-red-200'
                            : level === 'medium'
                            ? 'bg-yellow-500/30 border border-yellow-400/50 text-yellow-200'
                            : 'bg-green-500/30 border border-green-400/50 text-green-200'
                          : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 bg-white/10 border border-white/20 rounded-xl text-white/70 hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={!title.trim()}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500/80 to-purple-500/80 border border-blue-400/30 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500/90 hover:to-purple-500/90 transition-all"
                  whileHover={{ scale: title.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: title.trim() ? 0.98 : 1 }}
                >
                  Add Todo
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default AddTodo