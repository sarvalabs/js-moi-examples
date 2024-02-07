import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const logicId = process.env.REACT_APP_LOGIC_ID;
const provider = new VoyageProvider("babylon");

const constructBaseWallet = async () => {
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(
    process.env.REACT_APP_BASE_MNEMONIC,
    "m/44'/6174'/7020'/0/0"
  );
  return wallet;
};

const baseWallet = await constructBaseWallet();

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
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.persistentState.get("owner");
};

const GetTodos = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.GetTodos();
};

const logic = {
  GetTodos,
  AddTodo,
  MarkTodoCompleted,
  GetOwner,
};

export default logic;
