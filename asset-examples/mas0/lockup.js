import { MAS0AssetLogic } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const lockupAsset = async () => {
    const wallet = await createWallet();

    // Replace the asset id and beneficiary
    const assetId = "0x1003000030fb1b0219f8a2b7b7b42b1436402a4a03d701822b8d15de00000000";
    const beneficiary = "0x000000008f1871e0d169c2fe63a31e221d96ff4e026bda558758b69800000000";

    const mas0 = new MAS0AssetLogic(assetId, wallet);

    const response = await mas0.lockup(beneficiary, 10000).send()

    console.log("Hash", response.hash)

    const receipt = await response.wait()

    console.log("Receipt", receipt)

    const result = await response.result()

    console.log("Result", result)
}

lockupAsset()
