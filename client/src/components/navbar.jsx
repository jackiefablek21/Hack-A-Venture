import { useWallet } from "../contexts/WalletContext.jsx";
import InteractWithContract from "../contracts/SmartContract.jsx";

const Navbar = () => {
    const { account, connectWallet } = useWallet();

    return (
        <nav>
            <h1>U2U Project</h1>
            {account ? (
                <span>Connected: {account.substring(0, 6)}...{account.slice(-4)}</span>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            <InteractWithContract></InteractWithContract>
        </nav>
    );
}

export default Navbar;