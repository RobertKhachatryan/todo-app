import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();
  ///////////////////////////////////////////////////////////////////////////////
  // const [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: "HTML&CSS ", isDone: true },
  //   { id: v1(), title: "Js ", isDone: true },
  //   { id: v1(), title: "React ", isDone: false },
  //   { id: v1(), title: "Redux ", isDone: false },
  //   { id: v1(), title: "GraphQl ", isDone: false },
  // ]);
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "Wanna learn", filter: "active" },
    { id: todoListId2, title: "Wanna buy", filter: "completed" },
  ]);
  const [tasksObj, setTasksObj] = useState({
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS ", isDone: true },
      { id: v1(), title: "Js ", isDone: true },
      { id: v1(), title: "React ", isDone: false },
      { id: v1(), title: "Redux ", isDone: false },
      { id: v1(), title: "GraphQl ", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book ", isDone: false },
      { id: v1(), title: "Milk ", isDone: true },
    ],
  });

  /////////////////////////////////////////////////////////////////////////////////

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  }
  const removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  };

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];

        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            filter={tl.filter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
