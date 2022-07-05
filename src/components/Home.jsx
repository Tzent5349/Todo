import React, { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUndo } from "react-icons/gr";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("todoList")) {
      const storedList = JSON.parse(localStorage.getItem("todoList"));
      setTodoList(storedList);
    }
  }, []);

  const [showInput, setShowInput] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);

  const showInputField = () => {
    setShowInput(true);
    setShowButton(false);
  };

  const showTaskButton = () => {
    setShowInput(false);
    setShowButton(true);
  };

  const deleteTodo = (todo) => {
    const deleted = todoList.filter((i) => i.id !== todo.id);
    setTodoList(deleted);
    localStorage.setItem("todoList", JSON.stringify(deleted));
  };

  const createTasks = (e) => {
    e.preventDefault();

    const newTask = {
      title: task,
      id: new Date().getTime().toString(),
      status,
    };
    setTodoList([...todoList, newTask]);
    localStorage.setItem("todoList", JSON.stringify([...todoList, newTask]));
    setTask("");
    showTaskButton();
  };

  const changeStatus = (identifier) => {
    const index = todoList.findIndex((todo) => todo.id === identifier);
    const newTodos = [...todoList];
    newTodos[index].status = true;
    localStorage.setItem("todoList", JSON.stringify(newTodos));

    window.location.reload();
  };

  const redoStatus = (identifier) => {
    const index = todoList.findIndex((todo) => todo.id === identifier);
    const newTodos = [...todoList];
    newTodos[index].status = false;

    localStorage.setItem("todoList", JSON.stringify(newTodos));
    window.location.reload();
  };

  return (
    <div className="todoAppContainer w-screen bg-slate-300/90 h-screen overflow-hidden flex justify-center">
      <div className="todo mt-40  w-4/6 md:w-2/6 flex items-center h-fit flex-col">
        <div className="heading p-2 w-full text-center bg-cyan-800 rounded-lg">
          <h1 className="font-bold text-2xl text-slate-200"> Todo App </h1>
        </div>

        <div className="todoListContainer w-full mt-8  items-center rounded-md overflow-hidden bg-slate-400/40  flex flex-col ">
          <div className="headingContainer w-full flex items-center text-center ">
            <h1 className="w-full h-10  font-bold text-xl text-slate-200 bg-cyan-800/70 ">
              Todos
            </h1>
          </div>

          <div className="pt-4 w-full flex-wrap flex flex-col self-start px-6 gap-6">
            {todoList
              .filter((todoListStatus) => todoListStatus.status === false)
              .map((todo) => (
                <React.Fragment>
                  {
                    <div className="flex items-center text-2xl pb-1 font-semibold border-b-4 border-slate-200/90 text-slate-700 justify-between">
                      <button
                        onClick={() => changeStatus(todo.id)}
                        className=" hover:text-green-600 text-2xl"
                      >
                        <TiTick />
                      </button>

                      {todo.title}

                      <button
                        onClick={() => deleteTodo(todo)}
                        className=" hover:text-red-600 text-2xl"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  }
                </React.Fragment>
              ))}
          </div>
          {showButton && (
            <div className="createTaskButton flex self-start mt-2 p-2 ml-14 ">
              <button
                onClick={showInputField}
                className="flex hover:text-red-500 gap-2 items-center text-slate-600/50 "
              >
                <AiOutlinePlus className="text-2xl " />
                <h1 className="text-xl font-semibold">Create a Task</h1>
              </button>
            </div>
          )}

          {showInput && (
            <form
              onSubmit={createTasks}
              className="inputContainer m-5 flex  p-2 rounded-xl bg-slate-200/50 flex-col gap-4 boder-2 border "
            >
              <input
                type="text"
                value={task}
                autoFocus
                required
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                placeholder="What needs to do shall be done"
                className="outline-none w-72 px-4 py-4 rounded-xl"
              />

              <div className="buttonContainer flex ml-auto gap-4">
                <button
                  type="submit"
                  className="text-lg font-semibold rounded-lg p-1 bg-cyan-600 text-slate-200 hover:text-cyan-900 hover:bg-cyan-600/50"
                >
                  Create Task
                </button>
                <button
                  onClick={showTaskButton}
                  className="text-lg font-semibold rounded-lg p-1 bg-cyan-600 text-slate-200 hover:text-red-600 hover:bg-cyan-600/50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* From here starts completed todos */}

        <div className="completedTodoListContainer w-full mt-8  items-center rounded-md overflow-hidden bg-slate-400/40  flex flex-col ">
          <div className="headingContainer w-full flex items-center text-center ">
            <h1 className="w-full h-10  font-bold text-xl text-slate-200 bg-cyan-800/70 ">
              Completed Todos
            </h1>
          </div>

          <div className="pt-4 w-full flex-wrap flex flex-col self-start px-6 gap-4">
            {todoList
              .filter((todoListStatus) => todoListStatus.status === true)
              .map((completedTodo) => (
                <React.Fragment>
                  {
                    <div className="flex items-center text-2xl font-semibold px-2 border-b-4 mb-2 border-slate-200/90 text-slate-700 justify-between">
                      {completedTodo.title}

                      <button onClick={() => redoStatus(completedTodo.id)}>
                        <GrUndo />
                      </button>
                    </div>
                  }
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
