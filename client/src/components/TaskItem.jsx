import { useState } from 'react';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [busy, setBusy] = useState(false);

  const toggleCompleted = async () => {
    setBusy(true);
    try {
      await onUpdate(task._id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: !task.completed
      });
    } finally {
      setBusy(false);
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await onUpdate(task._id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: task.completed
      });
      setEditing(false);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this task?')) return;
    setBusy(true);
    try {
      await onDelete(task._id);
    } finally {
      setBusy(false);
    }
  };

  if (editing) {
    return (
      <li className="card task-item">
        <form className="task-edit" onSubmit={saveEdit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          <div className="form-row">
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              Save
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`card task-item ${task.completed ? 'done' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompleted}
          disabled={busy}
        />
      </label>
      <div className="task-body">
        <div className="task-title-row">
          <span className="task-title">{task.title}</span>
          <span className={`badge badge-${task.priority || 'medium'}`}>
            {task.priority || 'medium'}
          </span>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
        {task.createdAt && (
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="task-actions">
        <button className="btn btn-ghost" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={remove} disabled={busy}>
          Delete
        </button>
      </div>
    </li>
  );
}
