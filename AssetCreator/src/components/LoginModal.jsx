import React, { useState } from "react";
import { Input, Modal } from "antd";
import { validateMnemonic } from "js-moi-sdk";

const LoginModal = ({ isModalOpen, handleLogin, closeLoginModal }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  const handleMnemonicChange = (e) => {
    setMnemonic(e.target.value);
  };

  const handleOk = () => {
    if (!validateMnemonic(mnemonic)) {
      return setError("Invalid Mnemonic");
    }

    handleLogin(mnemonic);
    setMnemonic("");
  };

  return (
    <>
      <Modal
        className="modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeLoginModal}
        destroyOnClose={true}
      >
        <h2 className="modal__title">Enter Mnemonic</h2>
        <input
          className="modal__input"
          type="text"
          onChange={handleMnemonicChange}
          value={mnemonic}
        />
        {error && <p className="modal__error">{error}</p>}
      </Modal>
    </>
  );
};
export default LoginModal;
