# asset-examples (MAS0 Asset Logic)

This repository contains example scripts that demonstrate how to deploy and interact with an **MAS0 Asset Logic** using **js-moi-sdk**. The examples focus on key asset lifecycle operations such as creation, minting, transferring, burning, approvals, and lockup/release interactions.

The examples are intentionally minimal and focused on showing how to:

1. Create a new MAS0 asset.
2. Mint and transfer tokens.
3. Manage approvals and allowances.
4. Burn tokens and manage supply.
5. Lock and release assets under specific conditions.

---

## Prerequisites

* Node.js (v16+ recommended)
* npm
* A funded wallet mnemonic or private key for sending interactions
* `js-moi-sdk` installed as a dependency

---

## Usage

### 1) Install dependencies

```bash
npm install
```

### 2) Create a new asset

```bash
npm run create
```

**What it does**

* Connects to `RPC_URL` using your wallet.
* Creates a new MAS0 asset logic on-chain.
* Prints the newly created asset account.

### 3) Mint tokens

```bash
npm run mint
```

**What it does**

* Mints tokens to a target account.
* Prints the transaction hash and updated balances.

### 4) Transfer tokens

```bash
npm run transfer
```

**What it does**

* Transfers tokens from your wallet to another account.
* Confirms the transaction and prints updated balances.

### 5) Approve allowances

```bash
npm run approve
```

**What it does**

* Approve a spender for a specific amount.

### 6) Transfer from benefactor

```bash
npm run transfer-from
```

**What it does**

* Transfer tokens from approved benefactor to another id.

### 7) Revoke allowances

```bash
npm run revoke
```

**What it does**

* Revoke an existing approval.

### 8) Burn tokens

```bash
npm run burn
```

**What it does**

* Burns tokens from the signer’s account, reducing total supply.
* Prints the transaction receipt and updated supply.

### 9) Lock tokens

```bash
npm run lockup
```

**What it does**

* Locks tokens for a defined duration or until specific conditions are met.
* Releases the locked tokens once eligible.

### 10) Release tokens

```bash
npm run release
```

**What it does**

* Releases the locked tokens once eligible.

---

## Troubleshooting

* **Invalid mnemonic/private key**: Ensure credentials are correctly formatted.
* **Insufficient funds**: The wallet must have enough native fuel tokens for transaction fees.
* **RPC errors**: Use a reliable RPC provider (Infura, Alchemy, QuickNode, etc.).
* **Reverts or transaction failures**: Check the revert reason in transaction receipts and verify input parameters.
