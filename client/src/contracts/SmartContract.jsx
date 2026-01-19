import { ethers } from "ethers";
import contractJson from "./HydraCoin.json";

const contractAddress = "0x6d23d5c2613cf9762416db965e9bb429c2c54699";
const abi = contractJson.abi;

const InteractWithContract = () => {

    const checkBalance = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // 1. Get the actual string address from the signer
            const address = await signer.getAddress();

            const myContract = new ethers.Contract(contractAddress, abi, signer);

            // 2. Pass the ADDRESS string, not the signer object
            const balance = await myContract.balanceOf(address);

            // 3. Format the balance (assuming 18 decimals like most U2U tokens)
            const formattedBalance = ethers.formatUnits(balance, 18);

            console.log("Your HydraCoin Balance:", formattedBalance);
            alert(`Your Balance: ${formattedBalance} HYDRA`);

        } catch (err) {
            console.error("Interaction failed:", err);
            alert("Error: " + err.message);
        }
    };

    const checkNativeU2UBalance = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Notice we call getBalance on the PROVIDER, not a contract
        const balanceWei = await provider.getBalance(address);

        // Convert from Wei (18 decimals) to a readable number
        const balanceU2U = ethers.formatEther(balanceWei);

        console.log("Native U2U Balance:", balanceU2U);
        alert(`You have ${balanceU2U} U2U`);
    };

    return (
        <div>
            <button onClick={checkBalance}>Check Balance</button>
            <button onClick={checkNativeU2UBalance}>Check Native U2U Balance</button>
        </div>
    );
};

export default InteractWithContract;