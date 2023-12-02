import React from "react";
import { Link } from "react-router-dom";
import truncateStr from "../utils/truncateStr";

const Navbar = ({ wallet, mnemonic, handleLogout, openLoginModal }) => {
  return (
    <nav className="navbar">
      <div>
        <Link to="create-asset">Create Asset</Link>
        <Link to="transfer-asset">Transfer Asset</Link>
      </div>
      <div>
        <a onClick={mnemonic ? handleLogout : openLoginModal}>
          {mnemonic
            ? `Logout: ${wallet && truncateStr(wallet.getAddress(), 21)}`
            : "Login"}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
