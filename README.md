# dApp Examples

Welcome to the **dApp Examples** repository! This repository contains a collection of examples designed to assist you
in building applications using the Moi JavaScript SDK and Cocolang. The Moi SDK provides a powerful set of tools to interact with the Moi blockchain and ecosystem.

## Getting Started

To get started, make sure you're familiar with the official documentation. This documentation serves as a comprehensive
guide to understanding the various aspects of the Moi ecosystem and how to utilize its features effectively.

- Official Documentation: [Documentation](https://docs.moi.technology/)

## Moi JavaScript SDK

The core of your development experience will involve using the Moi JavaScript SDK. This SDK empowers you to integrate
Moi blockchain functionality seamlessly into your applications.

- npm Package: [js-moi-sdk](https://www.npmjs.com/package/js-moi-sdk?activeTab=readme)

## Exploring the Moi Blockchain

To explore the Moi blockchain and gain insights into its activities, you can use the Moi block explorer. This tool
allows you to visualize transactions, blocks, and other crucial information on the blockchain.

- Block Explorer: [Voyage](https://voyage.moi.technology/)

## Testnet Faucet

During your development and experimentation, you might need Moi tokens to test your applications. The Moi faucet on
the testnet provides you with the necessary tokens to facilitate your testing.

- Testnet Faucet: [Faucet](https://voyage.moi.technology/faucet/)

## Contribution

We welcome contributions from the community! If you have suggestions, improvements, or new examples to add, feel free
to fork this repository, make your changes, and submit a pull request.

## How to Get started with each app

### If the app has a Logic Directory

1. Navigate to the logic/coco directory using the terminal:

   ```bash
   cd logic/coco
   ```

2. Compile the coco logic (Run this every time after making changes to coco logic):

   ```bash
   coco compile
   ```

   This will generate an updated manifest file with the name `moduleName.json`.

3. Move back to the logic directory:

   ```bash
   cd ../
   ```

4. Install dependencies for the logic directory:

   ```bash
   npm install
   ```

5. If the logic directory has a `.env.example` file, then:

   - Create a `.env` file and paste the required fields referring to the given `.env.example` file.

6. Deploy the DReddit logic to MOI network:
   ```bash
   node deployModuleName.js
   ```
   Copy the logic ID from the transaction receipt displayed in the terminal.
   As this will be needed for your client app to make calls to the deployed logic

### In the client Directory

1. If the client directory has a `.env.example` file, then:

   - Create a `.env` file and paste the required fields referring to `.env.example`.

2. Install dependencies for the client:

   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npm start
   ```
