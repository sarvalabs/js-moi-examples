import { useEffect, useState } from "react";
import { ReactComponent as Main } from "./assets/main.svg";
import { Spin, Button } from "antd";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { toastError, toastInfo, toastSuccess } from "./utils/toastWrapper";
import logic from "./interface/logic";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";

function App() {
  const [isChecked, setIsChecked] = useState(true);
  const [ready, setReady] = useState(false);
  const [click, setClick] = useState(false);
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  const handleCheckboxChange = async () => {
    try {
      if (!wallet) return showConnectModal(true);
      setClick(false);
      toastInfo("Changing the time for you");

      await logic.flip(wallet);

      toastSuccess("Amost There");
      await getValue();

      toastSuccess("Changed the time for you");
      setClick(true);
    } catch (error) {
      toastError(error.message);
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  const getValue = async () => {
    const { value } = await logic.get();

    setIsChecked(value);
    setReady(true);
    setClick(true);
    document.body.style.background = value ? "#0288D1" : "#090D23";
  };

  return !ready ? (
    <div className="loader">
      <Spin size="large" />
    </div>
  ) : (
    <div className="container">
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
      <div className={``}>
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={!click ? true : false}
        />
        <label htmlFor="checkbox" className={``}>
          <Main className={`svg`} />
        </label>
      </div>
    </div>
  );
}

export default App;
