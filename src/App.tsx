import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  ///////////////////////////////////////////////////////////////////////////////
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS ", isDone: true },
    { id: v1(), title: "Js ", isDone: true },
    { id: v1(), title: "React ", isDone: false },
    { id: v1(), title: "Redux ", isDone: false },
    { id: v1(), title: "GraphQl ", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  /////////////////////////////////////////////////////////////////////////////////
  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
