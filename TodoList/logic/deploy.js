const { VoyageProvider, Wallet, LogicFactory} = require("js-moi-sdk");
const manifest = require("./todolist.json")

const MNEMONIC = "Your Mnemonic Here"

const constructWallet = async () => {
    const provider = new VoyageProvider("babylon")
    const wallet = new Wallet(provider);
    await wallet.fromMnemonic(MNEMONIC, "m/44'/6174'/7020'/0/0");
    return wallet
}

const deployLogic = async()=>{
    const wallet = await constructWallet()

    console.log("------ Deploying Logic ----------")
    const logicFactory = new LogicFactory(manifest, wallet)
    const ix = await logicFactory.deploy("Init!", []).send({
        fuelPrice: 1,
        fuelLimit: 1000
    })

    const [ixReceipt, ixResult] = await Promise.all([
        ix.wait(),
        ix.result()
    ])
    
    console.log("------ Deployed Logic Successfully!! ----------")
    console.log("------ IX Receipt ----------")
    console.log(ixReceipt)
    console.log("------ IX Result ----------")
    console.log(ixResult)
    console.log("------ Logic Id ----------")
    console.log(ixResult.logic_id)

    
}

deployLogic()



