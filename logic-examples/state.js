import { getLogicDriver, JsonRpcProvider, Wallet } from "js-moi-sdk";

const readState = async () => {
    const provider = new JsonRpcProvider("http://159.69.180.105:1600");
    // Replace the mnemonic
    const mnemonic = "head time shield olympic weather rose arrange sting slide fold tent soon";

    const wallet = await Wallet.fromMnemonic(mnemonic, "m/44'/6174'/0'/0/1")
    wallet.connect(provider)

    // Replace the logic id
    const logicId = "0x20000000bccb422cff28ddcc710f2bae59061b457df2846658cf42a300000000"
    const driver = await getLogicDriver(logicId, wallet)

    // persistentState will be renamed to logic state
    // ephemeralState will be renamed to actor state
    const response = await driver.persistentState.get(access => access.entity("value"))

    console.log("Value", response)
}

readState()