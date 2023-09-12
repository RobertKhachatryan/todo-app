import React, { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  removeTodoList: (todoListId: string) => void;
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
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Title is reuired");
    }
  };

  const onAllClickFilterHandler = () => props.changeFilter("all", props.id);
  const onActiveClickFilterHandler = () =>
    props.changeFilter("active", props.id);
  const onCompletedClickFilterHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h3>
        {props.title + "   "}
        <button onClick={removeTodoList}>X</button>
      </h3>
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
            props.removeTask(t.id, props.id);
          };
          const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
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
