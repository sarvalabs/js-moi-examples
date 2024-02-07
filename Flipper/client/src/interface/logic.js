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

const flip = async (wallet) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.Flip();
  return ixResponse.result();
};

////////////////////////
// Observe/Read Calls
///////////////////////

const get = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.Get();
};

const logic = {
  flip,
  get,
};

export default logic;
