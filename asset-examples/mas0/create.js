import { MAS0AssetLogic } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const createAsset = async () => {
    const wallet = await createWallet();
    
    const id = wallet.getIdentifier().toHex()

    const response = await MAS0AssetLogic.create(
        wallet, "MOI", 200000, id, true,
    ).send();

    console.log("Hash", response.hash)

    const receipt = await response.wait()

    console.log("Receipt", receipt)

    const result = await response.result()

    console.log("Result", result)
}

createAsset()
