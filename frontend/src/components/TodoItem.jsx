import React, { useRef } from "react";
import axios from "axios";

const TodoItem = ({ todo, handleDeleteTodo }) => {
  const URI = useRef(`http://localhost:8000/api/todo`);
  const { title, desc } = todo;

  const handleDeleteTodoAsync = async (title) => {
    const response = await axios.delete(`${URI.current}${title}`);
    handleDeleteTodo(title);
    console.log(response);
  };

  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold" }}> {title} </span>
        {desc}
        <button
          className="btn btn-outline-danger my-2 mx-2"
          style={{ borderRadius: "50px" }}
          onClick={async () => await handleDeleteTodoAsync(title)}
        >
          X
        </button>
      </p>
      <hr />
    </div>
  );
};

export default TodoItem;
