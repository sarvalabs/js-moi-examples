import { getLogicDriver, JsonRpcProvider, Wallet } from "js-moi-sdk";

const invokeLogic = async () => {
    const provider = new JsonRpcProvider("http://159.69.180.105:1600");
    // Replace the mnemonic
    const mnemonic = "head time shield olympic weather rose arrange sting slide fold tent soon";

    const wallet = await Wallet.fromMnemonic(mnemonic, "m/44'/6174'/7020'/0/0")
    wallet.connect(provider)

    // Replace the logic id
    const logicId = "0x20000000bccb422cff28ddcc710f2bae59061b457df2846658cf42a300000000"
    const driver = await getLogicDriver(logicId, wallet)

    const response = await driver.routines.Toggle()

    console.log("Interaction hash", response.hash)

    const receipt = await response.wait()

    console.log("Interaction receipt", receipt)

    const result = await response.result()

    console.log("Interaction result", result)
}

invokeLogic()
