import Axios from "axios";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    Axios.get(`https://jsonplaceholder.typicode.com/todos`).then((res) => {
      console.log(res);

      setTodo(res.data.slice(20, 25));
    });
  }, []);

  function handleAddTask(e) {
    const value = e.target.value;
    setNewTodo(value);
  }

  function addTask() {
    const newTask = {
      title: newTodo,
    };
    Axios.post(`https://jsonplaceholder.typicode.com/todos`, newTask).then(
      (res) => {
        setTodo([res.data, ...todo]);
        setNewTodo("");
      }
    );
  }

  function removeTask(id) {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
      () => {
        const newTodos = todo.filter((item) => item.id !== id);
        setTodo(newTodos);
      }
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-600 to-blue-500 min-h-screen">
      <div className="flex flex-col items-center gap-5 mb-10">
        <h1 className="text-center font-bold text-white text-4xl pt-10 drop-shadow-lg">
          Todo List With API
        </h1>
        <input
          type="text"
          placeholder="Enter A Task"
          value={newTodo}
          onChange={handleAddTask}
          className="w-[400px] h-10 text-center rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors"
        >
          ADD
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        {todo &&
          todo.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between w-[500px] bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-800 font-semibold">{item.title}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeTask(item.id)}
                  className="bg-red-400 text-white p-2 rounded-full shadow hover:bg-red-500 transition-colors"
                >
                  ✖️
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
