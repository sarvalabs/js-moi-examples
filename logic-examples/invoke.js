import { getLogicDriver } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const invokeLogic = async () => {
    const wallet = await createWallet();

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
