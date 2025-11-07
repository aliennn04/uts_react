import { useState } from "react";
import "./App.css";
import './index.css'


interface Task {
  text: string;
  category: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");
  const [category, setCategory] = useState<string>("Pekerjaan");
  const [filter, setFilter] = useState<string>("Semua");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = { text: input, category };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const filteredTasks =
    filter === "Semua"
      ? tasks
      : tasks.filter((task) => task.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Daftar Tugas Harian
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Tambahkan tugas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="Pekerjaan">Pekerjaan</option>
          <option value="Pribadi">Pribadi</option>
          <option value="Belajar">Belajar</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold"
        >
          Tambah
        </button>
      </div>

      <div className="flex gap-3 flex-wrap justify-center mb-8">
        {["Semua", "Pekerjaan", "Pribadi", "Belajar", "Lainnya"].map(
          (kategori) => (
            <button
              key={kategori}
              onClick={() => setFilter(kategori)}
              className={`px-4 py-2 rounded-lg shadow-sm transition-all ${
                filter === kategori
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {kategori}
            </button>
          )
        )}
      </div>

      <ul className="w-full max-w-md">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white shadow-sm rounded-lg px-4 py-2 mb-2"
          >
            <span>{task.text}</span>
            <span className="text-sm text-gray-500">{task.category}</span>
          </li>
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-gray-500 text-center">Belum ada tugas.</p>
        )}
      </ul>
    </div>
  );
}
