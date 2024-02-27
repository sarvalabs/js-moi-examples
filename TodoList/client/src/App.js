import React, { useEffect, useState } from "react";
import { toastInfo, toastSuccess, toastError } from "./utils/toastWrapper";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import logic from "./interface/logic";
import "./app.css";
import { truncateStr } from "./utils/truncateStr";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [wallet, setWallet] = useState();
  const [ownerAddress, setOwnerAddress] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loaders
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    getTodos();
    getOwner();
  }, []);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  const handleTodoName = (e) => {
    setInputTodo(e.currentTarget.value);
  };

  const getTodos = async () => {
    try {
      const { todos } = await logic.GetTodos();

      setTodos(todos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toastError(error.message);
    }
  };

  const getOwner = async () => {
    try {
      const owner = await logic.GetOwner();
      setOwnerAddress(owner);
    } catch (error) {
      toastError(error.message);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!wallet) return showConnectModal(true);

    try {
      setAdding(true);
      toastInfo("Adding Todo ...");

      const { addedTodo } = await logic.AddTodo(wallet, inputTodo);
      setTodos([...todos, addedTodo]);

      toastSuccess("Successfully Added");
      setInputTodo("");
      setAdding(false);
    } catch (error) {
      setAdding(false);
      toastError(error.message);
    }
  };

  const markTodoCompleted = async (id) => {
    try {
      if (!wallet) return showConnectModal(true);
      setMarking(id);

      await logic.MarkTodoCompleted(wallet, id);
      const tTodos = [...todos];
      tTodos[id].completed = true;
      setTodos(tTodos);

      toastSuccess("Successfully marked as completed");
      setMarking(false);
    } catch (error) {
      setMarking(false);
      toastError(error.message);
    }
  };

  return (
    <>
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
      <section class="section-center">
        <form class="todo-form">
          <p class="alert"></p>
          <h3>Todo buddy</h3>
          {/* <h4>Owner: {ownerAddress && truncateStr(ownerAddress, 21)}</h4> */}
          <div class="form-control">
            <input
              value={inputTodo}
              name="inputTodo"
              onChange={handleTodoName}
              type="text"
              id="todo"
              placeholder="e.g. Attend Moi Event"
            />
            <button
              disabled={marking || adding}
              onClick={addTodo}
              type="submit"
              class="submit-btn"
            >
              {adding ? <Loader color={"#000"} loading={adding} /> : "Add Todo"}
            </button>
          </div>
        </form>
        {!loading ? (
          <div class="todo-container show-container">
            {todos.map((todo) => {
              return (
                <div class="todo-list">
                  <span className="todo">{todo.name}</span>
                  {todo.completed ? (
                    <img className="icon" src="/images/check.svg" />
                  ) : (
                    <button
                      disabled={marking || adding}
                      onClick={() => markTodoCompleted(todo.id)}
                      className="text-red pointer btn btn--small"
                    >
                      {marking === todo.id ? (
                        <Loader
                          color={"#000"}
                          loading={marking === 0 ? true : marking}
                        />
                      ) : (
                        "Mark Completed!"
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <Loader color={"#000"} loading={loading} />
          </div>
        )}
      </section>
    </>
  );
}

export default App;
