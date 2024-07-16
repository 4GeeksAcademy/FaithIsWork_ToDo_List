import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (taskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-4 col-4">
      <h2 className="text-center mb-4 display-1 ">Todo List</h2>
      <form onSubmit={handleFormSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={taskText}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr className="remove" key={task.id}>
              <td>{index + 1}</td>
              <td className={task.completed ? 'completed' : ''}>{task.text}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger button"
                  onClick={() => handleDelete(task.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="badge badge-secondary" style={{ fontSize: '10px', color: 'gray' }}>
        {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
      </span>
    </div>
  );
};

export default TodoList;
