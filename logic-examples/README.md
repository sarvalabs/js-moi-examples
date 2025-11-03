# logic-examples

This repository contains example scripts that demonstrate how to deploy a simple *Flipper* logic contract using **js-moi-logic**, invoke a routine defined in that logic, and read the on-chain state produced by the Flipper logic.

The examples are intentionally minimal and focused on showing how to:

1. Deploy a Flipper logic.
2. Invoke a routine (e.g., `Toggle`) on the deployed logic.
3. Read the logic's state after invocation.

---

## Prerequisites

* Node.js (v16+ recommended)
* npm
* A funded wallet mnemonic phrase for deploying and sending interactions
* `js-moi-sdk` installed as a dependency

---

## Install dependencies

```bash
npm install
```

## Deploy the logic

```bash
npm run deploy
```

## Invoke a routine in logic

```bash
npm run invoke
```

## Read the state

```bash
npm run state
```
