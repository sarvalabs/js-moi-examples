import { getLogicDriver } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const readState = async () => {
    const wallet = await createWallet();

    // Replace the logic id
    const logicId = "0x20000000bccb422cff28ddcc710f2bae59061b457df2846658cf42a300000000"
    const driver = await getLogicDriver(logicId, wallet)

    // persistentState will be renamed to logic state
    // ephemeralState will be renamed to actor state
    const response = await driver.persistentState.get(access => access.entity("value"))

    console.log("Value", response)
}

readState()
