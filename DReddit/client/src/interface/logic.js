import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = process.env.REACT_APP_LOGIC_ID;

const constructBaseWallet = async () => {
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(process.env.REACT_APP_BASE_MNEMONIC, "m/44'/6174'/7020'/0/0");
  return wallet;
};
const baseWallet = await constructBaseWallet();

////////////////////////
// Mutate/Write Calls
///////////////////////

const CreatePost = async (wallet, content) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.CreatePost(content);
  return ixResponse.result();
};

const Upvote = async (wallet, id) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.Upvote(id);
  return ixResponse.result();
};

const Downvote = async (wallet, id) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.Downvote(id);
  return ixResponse.result();
};

////////////////////////
// Observe/Read Calls
///////////////////////

const GetPosts = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.GetPosts();
};

const GetUserVote = async (wallet, id) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  return logicDriver.routines.GetUserVote(id);
};

const logic = {
  GetPosts,
  GetUserVote,
  CreatePost,
  Upvote,
  Downvote,
};

export default logic;
