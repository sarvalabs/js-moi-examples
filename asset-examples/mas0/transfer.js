import { MAS0AssetLogic } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const transferAsset = async () => {
    const wallet = await createWallet();

    // Replace the asset id and beneficiary
    const assetId = "0x1003000030fb1b0219f8a2b7b7b42b1436402a4a03d701822b8d15de00000000";
    const beneficiary = "0x000000004678e9f5bf2f66362ef5367fbc72efe7b419a5e7d851f57b00000000";

    const mas0 = new MAS0AssetLogic(assetId, wallet);

    const response = await mas0.transfer(beneficiary, 5000).send()

    console.log("Hash", response.hash)

    const receipt = await response.wait()

    console.log("Receipt", receipt)

    const result = await response.result()

    console.log("Result", result)
}

transferAsset()
