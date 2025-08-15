import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Edit3, Trash2 } from 'lucide-react';

const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit, 
  isEditing, 
  editValue, 
  onEditChange, 
  onEditSave, 
  onEditCancel 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEditSave();
    } else if (e.key === 'Escape') {
      onEditCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-center gap-3">
          {/* Checkbox */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              todo.completed
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 border-emerald-400 shadow-lg shadow-emerald-400/30'
                : 'border-white/30 hover:border-white/50 bg-white/5'
            }`}
          >
            {todo.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>

          {/* Todo Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <motion.input
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                type="text"
                value={editValue}
                onChange={(e) => onEditChange(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={onEditSave}
                autoFocus
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter todo text..."
              />
            ) : (
              <motion.p
                layout
                className={`text-white transition-all duration-300 cursor-pointer ${
                  todo.completed
                    ? 'line-through opacity-60'
                    : 'hover:text-white/80'
                }`}
                onClick={() => onEdit(todo.id, todo.text)}
              >
                {todo.text}
              </motion.p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isEditing ? (
              <div className="flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEditSave}
                  className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEditCancel}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <div className="flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(todo.id, todo.text)}
                  className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(todo.id)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Progress indicator for completed items */}
        {todo.completed && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-b-xl"
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;