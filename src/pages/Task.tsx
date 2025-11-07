import TaskForm from '../features/task/TaskForm'
import TaskList from '../features/task/TaskList'
import FilterBar from '../components/FilterBar'

export default function Tasks() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Tugas Harian</h1>
      <TaskForm />
      <FilterBar />
      <TaskList />
    </div>
  )
}
