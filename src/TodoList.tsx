import React, { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodoList = (props: PropsType) => {
  //////////////////////////////////////////////////////////////////////////
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  //////////////////////////////////////////////////////////////////////////

  const onNewTitleChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is reuired");
    }
  };

  const onAllClickFilterHandler = () => props.changeFilter("all");
  const onActiveClickFilterHandler = () => props.changeFilter("active");
  const onCompletedClickFilterHandler = () => props.changeFilter("completed");
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">Title is required</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => {
            props.removeTask(t.id);
          };
          const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={removeTask}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "selected-bg" : ""}
          onClick={onAllClickFilterHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "selected-bg" : ""}
          onClick={onActiveClickFilterHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "selected-bg" : ""}
          onClick={onCompletedClickFilterHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
