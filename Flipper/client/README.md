# Flipper
Flipper is a module that provides logic for interacting with the moi protocol. This document provides comprehensive guidance on deploying the Flipper logic, running the application locally, and interacting with the logic through the moi protocol. Please follow the steps outlined below to ensure a smooth experience.

## Installation and Deployment
**1. Compile the Flipper Module:**
Begin by compiling the Flipper module using the coco compiler. Open a terminal and execute the following command:
    ```
    coco compile flipper.coco --format json
    ```
    This action generates the flipper.json file within the bin directory..

**2. Deploy Flipper Logic:**
Deploy the Flipper logic to the moi protocol using the provided JavaScript code snippet. This code connects to the protocol and deploys the logic as specified. Make sure you have the necessary dependencies installed.
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
This step deploys the manifest (flipper.json), and you will receive an ix_hash, ix_result, and ix_receipt upon successful deployment. This logic is currently deployed, and the logic ID is: `0x0800004904ab2d8b0fb3561dc0c35592b8012e651c075ed9b878aad7531bbd8d194a9f`.

## Running the App Locally

**1. Setup environment variable:**
Create a new directory named env in the root directory of your project.
Inside the env directory, create a file named dev.env and add your seed phrase to this file.

**2. Run the Application:**
To run the application locally, follow these steps:
- Navigate to the `src`` directory using the terminal  
    ```
    cd src
    ```
- Install the required dependencies:
    ```
    npm install
    ```
- Start the application:
    ```
    npm start
    ```

**3. Logging In** 
Use the seed phrase you created earlier during the moi ID creation process to log in to the application. If you don't have a moi ID, you can create one at [Voyage](https://voyage.moi.technology/).

## Interacting with Logic via Voyage

To interact with the Flipper logic, you can use the moi protocol's [RPC interface](https://voyage.moi.technology/rpc/). This interface enables direct invocation of logic functions by passing the logic ID.

To interact with the logic, you will need to claim kmoi tokens from the [faucet](https://voyage.moi.technology/faucet/)