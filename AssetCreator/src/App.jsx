import React, { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import { VoyageProvider, Wallet } from "js-moi-sdk";
import Navbar from "./components/Navbar";
import AssetFactory from "./components/AssetFactory";
import AssetManager from "./components/AssetManager";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

const provider = new VoyageProvider("babylon");

function App() {
  // Auth
  const [wallet, setWallet] = useState();
  const [mnemonic, setMnemonic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setNewWallet();
  }, [mnemonic]);

  const setNewWallet = async () => {
    if (mnemonic) {
      const newWallet = new Wallet(provider);
      newWallet.fromMnemonic(mnemonic, "m/44'/6174'/7020'/0/0");
      setWallet(newWallet);
    } else {
      setWallet();
    }
  };

  const handleLogin = async (mnemonic) => {
    setMnemonic(mnemonic);
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    setMnemonic("");
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };
  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar
        wallet={wallet}
        mnemonic={mnemonic}
        handleLogout={handleLogout}
        openLoginModal={openLoginModal}
      />
      <LoginModal
        isModalOpen={isModalOpen}
        handleLogin={handleLogin}
        closeLoginModal={closeLoginModal}
      />
      <Routes>
        <Route
          path={"create-asset"}
          element={<AssetFactory wallet={wallet} openLoginModal={openLoginModal} />}
        />
        <Route
          path={"transfer-asset"}
          element={<AssetManager wallet={wallet} openLoginModal={openLoginModal} />}
        />
        <Route
          path="*" // Redirect to
          element={<AssetFactory wallet={wallet} openLoginModal={openLoginModal} />}
        />
      </Routes>
    </div>
  );
}

export default App;
