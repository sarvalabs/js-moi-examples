import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = "paste your logicId";

////////////////////////
// Mutate/Write Calls
///////////////////////

const AddTodo = async (wallet, inputTodo) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ix = await logicDriver.routines.AddTodo(inputTodo);
  return ix.result();
};

const MarkTodoCompleted = async (wallet, id) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ix = await logicDriver.routines.MarkTodoCompleted(id);
  return ix.wait();
};

////////////////////////
// Observe/Read Calls
///////////////////////

// We can get primitive state variables like this
const GetOwner = async () => {
  const logicDriver = await getLogicDriver(logicId, provider);
  return logicDriver.persistentState.get("owner");
};

const GetTodos = async () => {
  const logicDriver = await getLogicDriver(logicId, provider);
  return logicDriver.routines.GetTodos();
};

const logic = {
  GetTodos,
  AddTodo,
  MarkTodoCompleted,
  GetOwner,
};

export default logic;
