const hhat = require("hardhat");

async function main() {
    console.log("Deploying contract to U2U Network...");

    // 1. Get the contract factory
    const Contract = await hhat.ethers.getContractFactory("HydraCoin");

    // 2. Deploy with a constructor argument (the project name)
    // Pass the arguments IN ORDER as defined in your Solidity constructor
    // Argument 1: "Hack-A-Venture Project" (String)
    // Argument 2: 1000000 (Number)
    const contract = await Contract.deploy("Hack-A-Venture Project");

    await contract.waitForDeployment();

    console.log(`Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});