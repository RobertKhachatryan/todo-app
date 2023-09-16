import React, { useState } from "react";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

// TYPES
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
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
};

export const TodoList = (props: PropsType) => {
  const onAllClickFilterHandler = () => props.changeFilter("all", props.id);

  const onActiveClickFilterHandler = () =>
    props.changeFilter("active", props.id);

  const onCompletedClickFilterHandler = () =>
    props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />

        <button onClick={removeTodoList}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatusHandler = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={t.isDone}
              />

              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
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
