import React, { useState } from 'react';
import { Input, Modal } from 'antd';
const MnemonicModal = ({isModalOpen, handleOk, handleCancel, error}) => {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <Modal title="Enter Mnemonic" open={isModalOpen} onOk={() => handleOk(mnemonic)} onCancel={handleCancel} destroyOnClose={true}>
        <Input onChange={e => setMnemonic(e.target.value)}/>
        {error && <p style={{color: "red", fontWeight: 700, textAlign: "center"}}>{error}</p>}
      </Modal>
    </>
  );
};
export default MnemonicModal;