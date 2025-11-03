import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";
 
const logicId = "0x08000016f643018427b7d8639cce2be5f8941293ba97d041427dbc5fdc723fcfc73d88";
const provider = new VoyageProvider("babylon");
 
const constructBaseWallet = async () => {
  const wallet = await Wallet.fromMnemonic(
    "nominee curve promote skill bicycle test main ivory various elegant harsh october",
    "m/44'/6174'/7020'/0/0"
  );
 
  wallet.connect(provider)
  
  return wallet;
};
 
const baseWallet = await constructBaseWallet();
 
////////////////////////
// Mutate/Write Calls
///////////////////////
 
const flip = async (wallet) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.Toggle();
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