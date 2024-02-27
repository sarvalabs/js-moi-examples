import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = "paste your logicId";

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
  const logicDriver = await getLogicDriver(logicId, provider);
  return logicDriver.routines.GetPosts();
};

const GetUserVote = async (userAddress, id) => {
  const logicDriver = await getLogicDriver(logicId, provider);
  return logicDriver.routines.GetUserVote(id, userAddress);
};

const logic = {
  GetPosts,
  GetUserVote,
  CreatePost,
  Upvote,
  Downvote,
};

export default logic;
