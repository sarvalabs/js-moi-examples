import { MAS0AssetLogic } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const releaseAsset = async () => {
    const wallet = await createWallet();

    // Replace the asset id, beneficiary and benefactor
    const assetId = "0x1003000030fb1b0219f8a2b7b7b42b1436402a4a03d701822b8d15de00000000";
    const benefactor = "0x000000001ec28dabfc3e4ac4dfc2084b45785b5e9cf1287b63a4f46900000000";
    const beneficiary = "0x00000000ed434a2ab138e69295e134686d57d80a9aa3325dbbde9bbf00000000";
 
    const mas0 = new MAS0AssetLogic(assetId, wallet);

    const response = await mas0.release(benefactor, beneficiary, 100).send()

    console.log("Hash", response.hash)

    const receipt = await response.wait()

    console.log("Receipt", receipt)

    const result = await response.result()

    console.log("Result", result)
}

releaseAsset()
