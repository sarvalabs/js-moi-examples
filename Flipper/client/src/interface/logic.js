import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = "paste your logicId";

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
  const logicDriver = await getLogicDriver(logicId, provider);
  return logicDriver.routines.Get();
};

const logic = {
  flip,
  get,
};

export default logic;
