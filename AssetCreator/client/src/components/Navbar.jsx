import React from "react";
import { Link } from "react-router-dom";
import truncateStr from "../utils/truncateStr";

const Navbar = ({ wallet, updateWallet, showConnectModal }) => {
  return (
    <nav className="navbar">
      <div>
        <Link to="create-asset">Create Asset</Link>
        <Link to="transfer-asset">Transfer Asset</Link>
      </div>
      <div>
        <button
          className="connect-button"
          onClick={wallet ? () => updateWallet() : () => showConnectModal(true)}
        >
          {wallet
            ? `Disconnect: ${wallet && truncateStr(wallet.getAddress(), 11)}`
            : "Connect"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
