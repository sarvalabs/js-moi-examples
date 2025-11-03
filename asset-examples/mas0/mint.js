import { MAS0AssetLogic } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const mintAsset = async () => {
    const wallet = await createWallet();

    // Replace the asset id
    const assetId = "0x1003000030fb1b0219f8a2b7b7b42b1436402a4a03d701822b8d15de00000000";
    const beneficiary = wallet.getIdentifier().toHex();

    const mas0 = new MAS0AssetLogic(assetId, wallet);

    const response = await mas0.mint(beneficiary, 100000).send()

    console.log("Hash", response.hash)

    const receipt = await response.wait()

    console.log("Receipt", receipt)

    const result = await response.result()

    console.log("Result", result)
}

mintAsset()
