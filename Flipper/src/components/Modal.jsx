import React, { useState } from 'react';
import { Input, Modal } from 'antd';
const MnemonicModal = ({isModalOpen, handleOk, handleCancel}) => {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <Modal title="Enter Mnemonic" open={isModalOpen} onOk={() => handleOk(mnemonic)} onCancel={handleCancel} destroyOnClose={true}>
        <Input onChange={e => setMnemonic(e.target.value)}/>
      </Modal>
    </>
  );
};
export default MnemonicModal;