import React, { useState } from "react";
import "./style.css";

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todo, setTodo] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const addTodo = () => {
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo !== "") {
      const updatedTodo = [...todo, { text: trimmedTodo, done: false }];
      setTodo(updatedTodo);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
  };

  const toggleTodo = (index) => {
    const updatedTodo = [...todo];
    updatedTodo[index].done = !updatedTodo[index].done;
    setTodo(updatedTodo);
  };

  const clearCompleted = () => {
    const updatedTodo = todo.filter((item) => !item.done);
    setTodo(updatedTodo);
  };

  const filteredTodo = todo.filter((item) => {
    if (activeFilter === "active") return !item.done;
    if (activeFilter === "completed") return item.done;
    return true;
  });

  const todoLeft = todo.filter((item) => !item.done).length;
  const todoDone = todo.filter((item) => item.done).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>

      <section
        className="main"
        style={{ display: todo.length === 0 ? "none" : "block" }}
      >
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={todoLeft === 0}
          onChange={() => {
            setToggleAll(!toggleAll);
            setTodo(
              todo.map((item) => ({
                ...item,
                done: !toggleAll,
              }))
            );
          }}
        />
        <label htmlFor="toggle-all" onClick={() => setToggleAll(!toggleAll)}>
          Mark all as complete
        </label>

        <ul className="todo-list">
          {filteredTodo.map((item, index) => (
            <li
              key={index}
              className={item.done ? "completed" : ""}
              style={{
                display:
                  (item.done && activeFilter === "active") ||
                  (!item.done && activeFilter === "completed")
                    ? "none"
                    : "block",
              }}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTodo(index)}
                />
                <label>{item.text}</label>
                <button
                  className="destroy"
                  onClick={() => deleteTodo(index)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer
        className="footer"
        style={{ display: todo.length === 0 ? "none" : "block" }}
      >
        <span className="todo-count">
          <strong>{todoLeft}</strong> {todoLeft === 1 ? "item" : "items"} left
        </span>

        <ul className="filters">
          <li>
            <a
              className={activeFilter === "all" ? "selected" : ""}
              onClick={() => setActiveFilter("all")}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={activeFilter === "active" ? "selected" : ""}
              onClick={() => setActiveFilter("active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={activeFilter === "completed" ? "selected" : ""}
              onClick={() => setActiveFilter("completed")}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          className="clear-completed"
          onClick={clearCompleted}
          style={{ display: todoDone === 0 ? "none" : "block" }}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default TodoApp;
