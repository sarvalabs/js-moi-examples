import { VoyageProvider, Wallet, getLogicDriver } from 'js-moi-sdk'
import { MNEMONIC } from '../constants/constants';

const provider = new VoyageProvider('babylon');

const initializeWallet = async () => {
    const derivationPath = "m/44'/6174'/0'/0/1";
    const wallet = new Wallet(provider);
    await wallet.fromMnemonic(MNEMONIC, derivationPath);
    return wallet;
}


export const logicGet = async() => {
    let signer = await initializeWallet(provider);
    const logicID = "0x0800004904ab2d8b0fb3561dc0c35592b8012e651c075ed9b878aad7531bbd8d194a9f"
    const driver = await getLogicDriver(logicID, signer)

    const value = await driver.persistentState.get("value")
    return value
}

export const logicSet = async(userValue) => {
    let signer = await initializeWallet(provider);
    const logicID = "0x0800004904ab2d8b0fb3561dc0c35592b8012e651c075ed9b878aad7531bbd8d194a9f"
    const driver = await getLogicDriver(logicID, signer)

    const value = await driver.persistentState.get("value")
    console.log("Value: ", value)

    const args = [userValue]
    
    const response = await driver.routines.Set(args).send({
                sender: signer.getAddress(),
                fuelPrice: 1,
                fuelLimit: 1000,
            })

    console.log("ix_hash: ", response.hash)

    try {
        const receipt = await response.wait();
        console.log("ix_receipt: ", receipt)

        const result = await response.result();
        console.log("ix_result: ", result)
        return result
        
    } catch (error) {
        console.log(error)
        return null
    }
}