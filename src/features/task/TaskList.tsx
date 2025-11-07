import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../app/store'
import { toggleComplete, deleteTask, updateTask } from './taskSlice'
import { useState } from 'react'

export default function TaskList() {
  const dispatch = useDispatch()
  const { items, filter } = useSelector((state: RootState) => state.tasks)

  const filteredTasks =
    filter === 'all' ? items : items.filter(t => t.category === filter)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editCategory, setEditCategory] = useState('Pekerjaan')

  const startEdit = (task: typeof items[0]) => {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditCategory(task.category)
  }

  const saveEdit = () => {
    if (editingId !== null) {
      const taskToEdit = items.find(t => t.id === editingId)
      if (taskToEdit) {
        dispatch(
          updateTask({
            id: editingId,
            title: editTitle,
            category: editCategory,
            completed: taskToEdit.completed,
          })
        )
      }
      setEditingId(null)
      setEditTitle('')
      setEditCategory('Pekerjaan')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditCategory('Pekerjaan')
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <div
          key={task.id}
          className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-sm transition-colors duration-200 ${
            task.completed
              ? 'bg-green-50 border-green-200'
              : editingId === task.id
              ? 'bg-yellow-50 border-yellow-300'
              : 'bg-white border-gray-200'
          }`}
        >
          {editingId === task.id ? (
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
              <select
                value={editCategory}
                onChange={e => setEditCategory(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Pekerjaan">Pekerjaan</option>
                <option value="Pribadi">Pribadi</option>
                <option value="Belajar">Belajar</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <button
                onClick={saveEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
              >
                Simpan
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded transition"
              >
                Batal
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className="mr-2 w-4 h-4"
              />
              <span
                className={`text-sm md:text-base ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {task.title} ({task.category})
              </span>
            </div>
          )}
          {editingId !== task.id && (
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => startEdit(task)}
                className="text-blue-500 hover:text-blue-700 text-sm md:text-base"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-red-500 hover:text-red-700 text-sm md:text-base"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
