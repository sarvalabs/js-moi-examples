import { VoyageProvider, Wallet, getLogicDriver } from 'js-moi-sdk';

export const gettingLogicDriver = async(logicId, mnemonic, accountPath)=>{
    const provider = new VoyageProvider("babylon")
    const wallet = new Wallet(provider)
    await wallet.fromMnemonic(mnemonic, accountPath)
    return await getLogicDriver(logicId, wallet)
}