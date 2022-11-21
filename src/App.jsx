import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [todos, setTodos] = useState([
    { id: nanoid(), todo: "Make a coffee", isDone: false, isEdited: false },
  ]);

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const addTodo = (e) => {
    e.preventDefault();
    const { todo } = e.currentTarget.elements;
    const newTodoObj = { id: nanoid(), todo: todo.value, isDone: false };
    setTodos([...todos, newTodoObj]);
    e.currentTarget.reset();
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEdited: !todo.isEdited } : todo
      )
    );
  };

  const updateTodo = (e, id) => {
    e.preventDefault();
    const { todo } = e.currentTarget.elements;
    setTodos(
      todos.map((node) =>
        node.id === id ? { ...node, todo: todo.value, isEdited: false } : node
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input type="text" name="todo" />
        <button>Add todo</button>
      </form>
      <ul>
        {todos.map(({ id, todo, isDone, isEdited }) => (
          <li key={id}>
            {isEdited ? (
              <form onSubmit={(e) => updateTodo(e, id)}>
                <input type="text" name="todo" defaultValue={todo} />
                <button>Save</button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="done"
                  id={id}
                  checked={isDone}
                  onChange={(e) => toggleDone(id)}
                />
                <label
                  htmlFor={id}
                  style={{
                    textDecoration: `${isDone ? "line-through" : "none"}`,
                  }}>
                  {todo}
                </label>
                <button onClick={(e) => editTodo(id)}>Edit</button>
                <button onClick={() => deleteTodo(id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
