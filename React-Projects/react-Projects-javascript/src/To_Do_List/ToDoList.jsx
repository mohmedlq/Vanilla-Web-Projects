import React, { useState } from "react";
import './Tasklist.css';

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat Lunch", "Take a Nap", "Walk the cat"]);
  const [newTask, setnewTask] = useState("");

  function handelInputChange(e) {
    setnewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(T => [...T, newTask]);
      setnewTask("");
      return;
    }
    alert("input Cant be Empty");
  }

  function deleteTask(index) {
    const updatedtasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedtasks);
  }

  function moveTaskUp(index) {
    const UpdatedTasks = [...tasks];
    if (index === 0) return;

    [UpdatedTasks[index], UpdatedTasks[index - 1]] = 
    [UpdatedTasks[index - 1], UpdatedTasks[index]];
    setTasks(UpdatedTasks);
  }

  function moveTaskDown(index) {
    const UpdatedTasks = [...tasks];
    if (index === UpdatedTasks.length - 1) return;

    [UpdatedTasks[index], UpdatedTasks[index + 1]] = 
    [UpdatedTasks[index + 1], UpdatedTasks[index]];
    setTasks(UpdatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add Any Task"
          value={newTask}
          onChange={handelInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="task">{task}</span>

            <button
              className="delete-button"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>

            <button
              className="move-button"
              onClick={() => moveTaskUp(index)}
            >
              Move Up
            </button>

            <button
              className="move-button"
              onClick={() => moveTaskDown(index)}
            >
              Move Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;