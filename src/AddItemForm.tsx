import React, { useState } from "react";
import { Button } from "@mui/material";
// TYPES
type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
function AddItemForm(props: AddItemFormPropsType) {
  ////////////////////////////////////////////////////////////////////////
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  ////////////////////////////////////////////////////////////////////////
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is reuired");
    }
  };
  const onNewTitleChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === "Enter") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      />
      <Button onClick={addTask} variant="contained" color="primary">
        +
      </Button>
      {error && <div className="error-message">Title is required</div>}
    </div>
  );
}

export default AddItemForm;
