import { ethers } from "ethers";
import contractJson from "./HydraCoin.json";

const contractAddress = "0xdBceaAC488BdBc3735C602fDc761aBAe15e16E7c";
const abi = contractJson.abi;

const InteractWithContract = () => {

    const handleInteract = async () => {
        if (!window.ethereum) return alert("Please install MetaMask");

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Create the instance
            const myContract = new ethers.Contract(contractAddress, abi, signer);

            console.log("Calling updateName...");

            // Check your ABI: Is the function exactly "updateName"?
            const tx = await myContract.transfer("0xE5d7e1e3273d758a84b5E117A23332349587E956", 1);


            await tx.wait();

            console.log("Transaction confirmed!");
            alert("Success!");
        } catch (err) {
            console.error("Interaction failed:", err);
            alert("Error: " + err.message);
        }
    };

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
            <button onClick={handleInteract}>Transfer</button>
            <button onClick={checkBalance}>Check Balance</button>
            <button onClick={checkNativeU2UBalance}>Check Native U2U Balance</button>
        </div>
    );
};

export default InteractWithContract;