import { JsonRpcProvider, LogicFactory, Wallet } from "js-moi-sdk";
import fs from "fs/promises";
import path from "path";

const loadFile = async (filepath) => {
  const file = path.resolve(filepath);

  return await fs.readFile(file, "utf8");
};

const deployLogic = async () => {
    const provider = new JsonRpcProvider("http://159.69.180.105:1600");
    // Replace the mnemonic
    const mnemonic = "head time shield olympic weather rose arrange sting slide fold tent soon";

    const wallet = await Wallet.fromMnemonic(mnemonic, "m/44'/6174'/7020'/0/0")
    wallet.connect(provider)

    const manifest = JSON.parse(await loadFile("./flipper-logic/flipper.json"))
    const factory = new LogicFactory(manifest, wallet)

    const response = await factory.deploy("Seed", false)

    console.log("Interaction hash", response.hash)

    const receipt = await response.wait()

    console.log("Interaction receipt", receipt)

    const result = await response.result()

    console.log("Interaction result", result)
}

deployLogic()