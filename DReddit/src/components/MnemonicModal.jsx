import React, { useState } from 'react';
import { Input, Modal } from 'antd';

const MnemonicModal = ({isModalOpen, handleLogin, handleCancel, error}) => {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <Modal title="Enter Mnemonic" open={isModalOpen} onOk={() => handleLogin(mnemonic)} onCancel={handleCancel} destroyOnClose={true}>
        <Input style={{border:"1px solid black"}} onChange={e => setMnemonic(e.target.value)}/>
        {error && <p style={{color: "red", fontWeight: 700, textAlign: "center"}}>{error}</p>}
      </Modal>
    </>
  );
};
export default MnemonicModal;