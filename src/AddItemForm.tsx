import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
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
      setError("Title is required");
    }
  };
  const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <TextField
        variant="outlined"
        label="Type value"
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color="primary">
        <ControlPoint />
      </IconButton>
    </div>
  );
}

export default AddItemForm;
