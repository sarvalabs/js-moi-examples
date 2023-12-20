const { VoyageProvider, Wallet, LogicFactory } = require("js-moi-sdk");
const manifest = require("./DReddit.json");

// ------- Update with your Mnemonic ------------------ //
const MNEMONIC = "area repeat sudden beach item gloom dice hub grant number mouse custom";

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

const deployLogic = async () => {
  // getting wallet To sign and send the ix to the network
  const wallet = await constructWallet();

  // LogicFactory creates a new instance of Logic with it's manifest and sender's wallet
  const logicFactory = new LogicFactory(manifest, wallet);

  // Submitting the Interaction to the network to deploy the logic
  const ixResponse = await logicFactory.deploy("Init!", []).send({
    fuelPrice: 1,
    fuelLimit: 2000,
  });
  console.log("------ Deploying Logic ----------");
  console.log(ixResponse);

  // Polling the network for the Interaction Receipt and print it
  const ixReceipt = await ixResponse.wait();
  console.log("------ Deployed Logic Successfully!! ----------");
  console.log(ixReceipt);
};

deployLogic();
