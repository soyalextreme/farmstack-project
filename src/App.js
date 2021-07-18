import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoView from "./components/TodoListView";

function App() {
  const [todoList, setTodoList] = useState([{}]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const URI = useRef("http://localhost:8000/api/todo");

  const fetchTodosAxiosAsync = async () => {
    const response = await axios.get(URI.current);
    setTodoList(response.data);
  };
  const fetchTodos = useRef(fetchTodosAxiosAsync);

  useEffect(() => {
    fetchTodos.current();
  }, [fetchTodos]);

  const handleAddTodoAsync = async () => {
    const response = await axios.post(URI.current, {
      title,
      desc,
    });
    setTodoList([...todoList, { title, desc }]);
    setTitle("");
    setDesc("");
    // Dev log
    console.log(response);
  };

  const handleDeleteTodo = (title) => {
    const filtered = todoList.filter((todoItem) => todoItem.title !== title);
    setTodoList([...filtered]);
  };

  return (
    <div
      className="App list-group-item justify-content-center align-items-center"
      style={{ width: "400px", background: "white", marginTop: "15px" }}
    >
      <h1
        className="card text-white bg-primary mb-1"
        stylename="max-width: 20rem;"
      >
        Task manager
      </h1>
      <h6 className="card text-white bg-primary mb-3">
        {" "}
        Fast API - React Mongodb
      </h6>
      <div className="card-body">
        <h5 className="card- text-white bg-dark mb-3">Add your task</h5>
        <span className="card-text">
          <input
            className="mb-2 form-control titleIn"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="mb-2 form-control desIn"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className="btn btn-outline-primary mb-3"
            style={{ borderRadius: "50px", fontWeight: "bold" }}
            onClick={handleAddTodoAsync}
          >
            Add Task
          </button>
        </span>
        <h5 className="card text-white bg-dark mb-3">Your tasks</h5>
        <div>
          <TodoView todoList={todoList} handleDeleteTodo={handleDeleteTodo} />
        </div>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        Copyright 2021, All rigths reserved
      </h6>
    </div>
  );
}

export default App;
