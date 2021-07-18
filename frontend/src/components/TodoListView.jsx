import TodoItem from "./TodoItem";
import React from "react";

const TodoView = ({ todoList, handleDeleteTodo }) => (
  <div>
    <ul>
      {todoList.map((todoItem, idx) => (
        <TodoItem
          key={`${todoItem.title}/${idx}`}
          todo={todoItem}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </ul>
  </div>
);

export default TodoView;
