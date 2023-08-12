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
  const [error, setError] = useState("");
  const [click, setClick] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (mnemonic) => {
    if(validateMnemonic(mnemonic))
      {
        setMnemonic(mnemonic)
        setIsModalOpen(false);
        setError("")
        setClick(true)
      }
    else{
      setError("Incorrect mnemonic")
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false)
    setError("")
  };

  const handleCheckboxChange = async() => {
    setClick(false)
    const returnVal = await logicSet(!isChecked)
    if(returnVal !== null){
      setIsChecked(!isChecked);
      document.body.style.background = !isChecked ? "#0288D1": "#090D23"
      setClick(true)
    } else {
      console.log("Interaction failed")
      alert("Interaction failed! Try again")
      setClick(false)
    }
  };

  const handleLogout = () => {
    setMnemonic("")
    setError("")
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
      <div className='loader'>
        <Spin size="large" />
      </div> 
      ):(
      <div className='container'>
        <div className="modal">
          <Button onClick={!mnemonic ? showModal : handleLogout}>{!mnemonic ? "Login" : "Logout"}</Button>
          <MnemonicModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} error={error}/>
        </div>
        <div className={`wrapper ${!mnemonic || !click ? 'noClick' : ''}`}>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={!click ? true : false}
          />
          <label htmlFor="checkbox" className={`${!mnemonic || !click ? 'noClick' : ''}`}>
            <Main className={`svg ${!mnemonic || !click ? 'noClick' : ''}`}/>
          </label>
        </div>
      </div>
      )
  ));
}

export default App
