# Flipper
Flipper is a module that provides logic for interacting with the moi protocol. This README will guide you through the process of deploying the flipper logic, running the app locally, and interacting with the logic.

## Installation and Deployment
1. Compile the flipper module using the coco compiler:
    ```
    coco compile flipper.coco --format json
    ```
    This will generate the `flipper.json` file within the `bin` directory.

2. Deploy the flipper logic to the moi protocol using the following JavaScript code:
```javascript
const provider = new VoyageProvider('babylon');

const initializeWallet = async () => {
    const derivationPath = "m/44'/6174'/0'/0/1";
    const wallet = new Wallet(provider);
    await wallet.fromMnemonic(MNEMONIC, derivationPath);
    return wallet;
}

const logicDeploy = async() => {
    const signer = await initializeWallet(provider);
    const factory = new LogicFactory(flipper, signer);
    const args = [true]

    const response = await factory.deploy("Seed!", args).send({
                sender: signer.getAddress(),
                fuelPrice: 1,
                fuelLimit: 1000,
            });

    console.log("ix_hash: ", response.hash)

    const result = await response.result();
    console.log("ix_result: ", result)

    const receipt = await response.wait();
    console.log("ix_receipt: ", receipt)
}
```
This code will deploy the manifest (flipper.json). This logic is currently deployed, and the logic ID is: `0x0800004904ab2d8b0fb3561dc0c35592b8012e651c075ed9b878aad7531bbd8d194a9f`.

## Running the App Locally

1. Create a folder named `env` in the global directory.

2. Inside the `env` folder, create a file named `dev.env` containing your seed phrase.

3. To run the app locally, follow these steps:
- Navigate to the `src` directory  
     ```
     cd src
     ```
- Install dependencies:
     ```
     npm install
     ```
- Start the app: 
     ```
     npm start
     ```

4. To log in to the application, use the seed phrase you have created while creating your moi id. If you don't have a moi id, you can create one at [Voyage](https://voyage.moi.technology/).

## Interacting with logic via voyage

You can invoke logic functions directly using the moi protocol's [RPC interface](https://voyage.moi.technology/rpc/). To do this, you need to pass the logic ID.

To interact with the logic, you will need to claim kmoi tokens from the [faucet](https://voyage.moi.technology/faucet/)