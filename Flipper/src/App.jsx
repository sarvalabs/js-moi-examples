import { useEffect, useState } from 'react'
import { ReactComponent as Main } from "./assets/main.svg";
import { Spin, Button } from 'antd'
import './App.css'
import { logicGet, logicSet } from './interface/request';
import MnemonicModal from './components/Modal';
import { validateMnemonic } from 'js-moi-sdk'

function App() {
  const [isChecked, setIsChecked] = useState(true);
  const [ready, setReady] = useState(false)
  const [mnemonic, setMnemonic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (mnemonic) => {
    if(validateMnemonic(mnemonic))
      {
        setMnemonic(mnemonic)
        setIsModalOpen(false);
      }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = async() => {
    await logicSet(!isChecked)
    setIsChecked(!isChecked);
    document.body.style.background = !isChecked ? "#0288D1": "#090D23"
  };

  const handleLogout = () => {
    setMnemonic("")
  }

  useEffect(() => {
    const getValue = async () => {
      const value = await logicGet()
      setIsChecked(value)
      setReady(true)
      document.body.style.background = value ? "#0288D1": "#090D23"
    };
  
    getValue();
  },[])

  return (
      (!ready ? (
      <div className='wrapper'>
        <Spin size="large" />
      </div> 
      ):(
      <div className='container'>
        <div className="modal">
          <Button onClick={!mnemonic ? showModal : handleLogout}>{!mnemonic ? "Login" : "Logout"}</Button>
          <MnemonicModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}/>
        </div>
        <div className={`wrapper ${!mnemonic ? 'noClick' : ''}`}>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={!mnemonic ? true : false}
          />
          <label htmlFor="checkbox">
            <Main />
          </label>
        </div>
      </div>
      )
  ));
}

export default App
