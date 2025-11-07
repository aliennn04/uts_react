import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../features/task/taskSlice'
import type { RootState } from '../app/store';


export default function FilterBar() {
  const dispatch = useDispatch()
  const { list } = useSelector((state: RootState) => state.categories)
  const { filter } = useSelector((state: RootState) => state.tasks)

  return (
    <div className="flex gap-2 mb-4">
      <button
        className={`px-3 py-1 rounded ${
          filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => dispatch(setFilter('all'))}
      >
        Semua
      </button>
      {list.map(cat => (
        <button
          key={cat}
          className={`px-3 py-1 rounded ${
            filter === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => dispatch(setFilter(cat))}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
