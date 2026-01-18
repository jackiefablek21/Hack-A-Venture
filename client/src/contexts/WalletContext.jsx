import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState(null);

    const NEBULAS_CHAIN_ID_HEX = '0x9B4'; // 2484 in Hex
    const NEBULAS_CHAIN_ID_DEC = 2484;

    const nebulasParams = {
        chainId: NEBULAS_CHAIN_ID_HEX,
        chainName: 'U2U Nebulas Testnet',
        nativeCurrency: { name: 'U2U', symbol: 'U2U', decimals: 18 },
        rpcUrls: ['https://rpc-nebulas-testnet.u2u.xyz'],
        blockExplorerUrls: ['https://testnet.u2uscan.xyz']
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);

            // Request accounts first (triggers MetaMask popup)
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Check the network
            const network = await provider.getNetwork();
            const currentChainId = Number(network.chainId);

            // If not on Nebulas Testnet, force switch
            if (currentChainId !== NEBULAS_CHAIN_ID_DEC) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: NEBULAS_CHAIN_ID_HEX }],
                    });
                } catch (switchError) {
                    // This error code means the chain has not been added to MetaMask
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [nebulasParams],
                        });
                    } else {
                        throw switchError;
                    }
                }
                // Refresh provider after network switch to be safe
                return;
            }

            const userSigner = await provider.getSigner();
            const address = await userSigner.getAddress();

            setAccount(address);
            setSigner(userSigner);
            setChainId(currentChainId);

        } catch (error) {
            console.error("Connection error:", error);
            alert("Failed to connect wallet: " + error.message);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    // Re-run connect to update signer
                    connectWallet();
                } else {
                    setAccount(null);
                    setSigner(null);
                }
            });

            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
        }
    }, []);

    return (
        <WalletContext.Provider value={{ account, signer, chainId, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);