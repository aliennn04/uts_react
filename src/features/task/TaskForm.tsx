import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from './taskSlice'
import type { RootState } from '../../app/store';


export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Pekerjaan')
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.categories.list)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addTask({ title, category, completed: false }))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Tambahkan tugas..."
        className="border rounded p-2 flex-1"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border rounded p-2"
      >
        {categories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white rounded px-4">
        Tambah
      </button>
    </form>
  )
}
