import { MAS0AssetLogic } from "js-moi-sdk";
import { createWallet } from "../../utils/common";

const revokeAsset = async () => {
    const wallet = await createWallet();

    // Replace the asset id and beneficiary
    const assetId = "0x1003000062a0776968187ae93f1d582f27e7dd143187aa83ff2430df00000000";
    const beneficiary = "0x000000008f1871e0d169c2fe63a31e221d96ff4e026bda558758b69800000000";

    const mas0 = new MAS0AssetLogic(assetId, wallet);

    const response = await mas0.revoke(beneficiary).send()

    console.log("Hash", response.hash)

    const receipt = await response.wait()

    console.log("Receipt", receipt)

    const result = await response.result()

    console.log("Result", result)
}

revokeAsset()
