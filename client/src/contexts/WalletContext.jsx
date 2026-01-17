import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState(null);

    // Function to connect wallet
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();

            // U2U Chain ID is 39
            if (Number(network.chainId) !== 39) {
                alert("Please switch to U2U Solaris Mainnet");
                return;
            }

            const userSigner = await provider.getSigner();
            const address = await userSigner.getAddress();

            setAccount(address);
            setSigner(userSigner);
            setChainId(Number(network.chainId));
        } catch (error) {
            console.error("Connection error:", error);
        }
    };

    // Automatically listen for account or network changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) setAccount(accounts[0]);
                else setAccount(null);
            });

            window.ethereum.on("chainChanged", () => {
                window.location.reload(); // Refresh on network change
            });
        }
    }, []);

    return (
        <WalletContext.Provider value={{ account, signer, chainId, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

// Custom hook to use this context easily
export const useWallet = () => useContext(WalletContext);