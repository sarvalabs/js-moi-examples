require("dotenv").config();
const { VoyageProvider, Wallet, LogicFactory } = require("js-moi-sdk");
const flipperManifest = require("./coco/flipper.json");
 
// User's (private key/secret phrase/seed phrase/mnemonic) to sign the interaction
const MNEMONIC = "nominee curve promote skill bicycle test main ivory various elegant harsh october";
 
// JsonRpcProvider to interact with MOI Network (Here we are using public RPC from Voyage)
const provider = new VoyageProvider("babylon");
 
// Function to instantiate a wallet with provider and sender account
const constructWallet = async () => {
  // The path derives your account from the mnemonic
  const accountPath = "m/44'/6174'/7020'/0/0";
 
  const wallet = await Wallet.fromMnemonic(MNEMONIC, accountPath);
 
  wallet.connect(provider)
 
  return wallet;
};
 
const deployFlipperLogic = async () => {
  // getting wallet To sign and send the ix to the network
  const wallet = await constructWallet();
 
  console.log(wallet.address)
 
  // LogicFactory creates a new instance of Logic with it's manifest and sender's wallet
  const flipperLogic = new LogicFactory(flipperManifest, wallet);
 
  // Submitting the Interaction to the network to deploy the logic
  const ixResponse = await flipperLogic.deploy("Seed", true);
  console.log("------ Deploying Logic ----------");
  console.log(ixResponse);
 
  // Polling the network for the Interaction Receipt and printing it for getting logic_id
  const ixReceipt = await ixResponse.wait();
  console.log("------ Deployed Logic Successfully!! ----------");
  console.log(ixReceipt);
 
  console.log("----- LOGIC_ID -----");
  console.log(ixReceipt.ix_operations[0].data.logic_id);
};
 
deployFlipperLogic();