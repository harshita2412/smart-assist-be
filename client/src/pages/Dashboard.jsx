import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as tasksApi from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed
};

export default function Dashboard() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setError('');
      const data = await tasksApi.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    const created = await tasksApi.createTask(task);
    setTasks((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id, updates) => {
    const updated = await tasksApi.updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await tasksApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const visibleTasks = tasks.filter(FILTERS[filter]);
  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="dashboard">
      <header className="topbar">
        <h1>Smart Assist</h1>
        <button className="btn btn-ghost" onClick={logout}>
          Log out
        </button>
      </header>

      <main className="container">
        <TaskForm onCreate={handleCreate} />

        <div className="list-header">
          <span className="count">
            {remaining} task{remaining === 1 ? '' : 's'} remaining
          </span>
          <div className="filters">
            {Object.keys(FILTERS).map((key) => (
              <button
                key={key}
                className={`btn btn-filter ${filter === key ? 'active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="alert">{error}</div>}

        {loading ? (
          <p className="empty">Loading tasks…</p>
        ) : visibleTasks.length === 0 ? (
          <p className="empty">No tasks here. Add one above!</p>
        ) : (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
