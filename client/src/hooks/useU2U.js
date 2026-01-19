import { ethers } from "ethers";

export const useU2U = () => {
    const connect = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return { provider, signer };
    };
    return { connect };
};