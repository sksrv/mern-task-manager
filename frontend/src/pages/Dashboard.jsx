import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    // ✅ If token not yet available, do nothing
    if (!token) return;

    try {
      const response = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Fetch tasks failed:", error);
      
    }
  };


  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        { title: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.log("ADD TASK ERROR:", error.response);
      alert(
        error.response?.data?.message ||
        `Error: ${error.response?.status}`
      );
    }


  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error("UPDATE TASK ERROR:", error);
      alert("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.error("DELETE TASK ERROR:", error);
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    // Call fetchTasks inside an async IIFE to avoid synchronous setState in effect
    (async () => {
      await fetchTasks();
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-600">

      {/* Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks yet</p>
          )}

          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between border p-3 rounded-md"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    handleToggleTask(task._id, task.completed)
                  }
                />
                <span
                  className={
                    task.completed
                      ? "line-through text-gray-400"
                      : ""
                  }
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => handleDeleteTask(task._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
