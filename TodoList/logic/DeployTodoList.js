require("dotenv").config();
const { VoyageProvider, Wallet, LogicFactory } = require("js-moi-sdk");
const todoListManifest = require("./coco/todolist.json");

// User's (private key/secret phrase/seed phrase/mnemonic) to sign the interaction
const MNEMONIC = process.env.MNEMONIC;

// JsonRpcProvider to interact with MOI Network (Here we are using public RPC from Voyage)
const provider = new VoyageProvider("babylon");

// Function to instantiate a wallet with provider and sender account
const constructWallet = async () => {
  const wallet = new Wallet(provider);

  // The path derives your account from the mnemonic
  const accountPath = "m/44'/6174'/7020'/0/0";

  await wallet.fromMnemonic(MNEMONIC, accountPath);
  return wallet;
};

const deployTodoListLogic = async () => {
  // getting wallet To sign and send the ix to the network
  const wallet = await constructWallet();

  // LogicFactory creates a new instance of Logic with it's manifest and sender's wallet
  const todoListLogic = new LogicFactory(todoListManifest, wallet);

  // Submitting the Interaction to the network to deploy the logic
  const ixResponse = await todoListLogic.deploy("InitOwner!");
  console.log("------ Deploying Logic ----------");
  console.log(ixResponse);

  // Polling the network for the Interaction Receipt and printing it for getting logic_id
  const ixReceipt = await ixResponse.wait();
  console.log("------ Deployed Logic Successfully!! ----------");
  console.log(ixReceipt);

  console.log("----- LOGIC_ID -----");
  console.log(ixReceipt.extra_data.logic_id);
};

deployTodoListLogic();
