import React, { useState } from "react";
import { Input, Modal } from "antd";
import { Wallet, validateMnemonic, VoyageProvider } from "js-moi-sdk";
import { toastError } from "../utils/toastWrapper";

const provider = new VoyageProvider("babylon");
const account = "m/44'/6174'/7020'/0/0"; // 0th account path derivation

const ConnectModal = ({ isModalOpen, updateWallet, showConnectModal }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  const handleConnect = async (mnemonic) => {
    try {
      if (!validateMnemonic(mnemonic)) {
        return setError("Incorrect mnemonic");
      }

      const wallet = await Wallet.fromMnemonic(mnemonic, account);
      wallet.connect(provider);
      updateWallet(wallet);

      setError("");
      showConnectModal(false);
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleCancel = () => {
    setError("");
    showConnectModal(false);
  };

  return (
    <>
      <Modal
        title="Enter Mnemonic"
        open={isModalOpen}
        onOk={() => handleConnect(mnemonic)}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Input
          style={{ border: "1px solid black" }}
          onChange={(e) => setMnemonic(e.target.value)}
        />
        {error && (
          <p style={{ color: "red", fontWeight: 700, textAlign: "center" }}>
            {error}
          </p>
        )}
      </Modal>
    </>
  );
};
export default ConnectModal;
