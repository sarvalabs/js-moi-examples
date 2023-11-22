require("dotenv").config()
const fs = require("fs")              
const path = require("path")
const { VoyageProvider, Wallet, LogicFactory} = require("js-moi-sdk");
const manifest = require("./todolist.json")

const MNEMONIC = "above cupboard brown mimic bargain tomato lecture want pool prefer busy flush"

const provider = new VoyageProvider("babylon")
const latestDeploymentFilePath = path.join(__dirname, "./latestDeployment.json")

const constructWallet = async () => {
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



