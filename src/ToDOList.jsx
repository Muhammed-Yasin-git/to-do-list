import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowUp, faArrowDown, faTrash  } from '@fortawesome/free-solid-svg-icons';

function ToDoList() {
    const [tasks, setTasks] = useState(["Have Lunch", "Go for A walk"]);
    const [newTask, setNewTask] = useState("");
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    
    function handleChangeInput(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    }

    function removeTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function handleEditTask(index) {
        setEditingTaskIndex(index);
        setEditedTask(tasks[index]);
    }

    function saveEditedTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask;
        setTasks(updatedTasks);
        setEditingTaskIndex(null);
        setEditedTask("");
    }

    return (
        <div className="to-do-list">
            <h2>To Do List</h2>
            <input type="text" value={newTask} onChange={handleChangeInput} placeholder="Enter Task" />
            <button className="add-btn" onClick={addTask}>Add</button>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editingTaskIndex === index ? (
                            <>
                                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                                <button className="edit-btn" onClick={() => saveEditedTask(index)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="task-text">{task}</span>
                                <button className="edit-btn" onClick={() => handleEditTask(index)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="move-btn" onClick={() => moveTaskUp(index)}>
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>
                                <button className="move-btn" onClick={() => moveTaskDown(index)}>
                                    <FontAwesomeIcon icon={faArrowDown} />
                                </button>
                                <button className="delete-btn" onClick={() => removeTask(index)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
