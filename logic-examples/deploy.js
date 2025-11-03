import { LogicFactory } from "js-moi-sdk";
import { createWallet } from "../../utils/common";
import fs from "fs/promises";
import path from "path";

const loadFile = async (filepath) => {
  const file = path.resolve(filepath);

  return await fs.readFile(file, "utf8");
};

const deployLogic = async () => {
    const wallet = await createWallet();

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