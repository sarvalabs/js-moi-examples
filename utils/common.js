import { JsonRpcProvider, Wallet } from "js-moi-sdk";

export const createWallet = async () => {
    // Replace rpc address if required
    const provider = new JsonRpcProvider("http://159.69.180.105:1600");
    // Replace the mnemonic
    const mnemonic = "head time shield olympic weather rose arrange sting slide fold tent soon";

    const wallet = await Wallet.fromMnemonic(mnemonic, "m/44'/6174'/7020'/0/0")
    wallet.connect(provider)

    return wallet
}
