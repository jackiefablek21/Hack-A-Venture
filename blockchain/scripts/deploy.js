const hhat = require("hardhat");

async function main() {
    console.log("Deploying contract to U2U Network...");

    // 1. Get the contract factory
    const Contract = await hhat.ethers.getContractFactory("HydraCoin");

    // 2. Deploy with a constructor argument (the project name)
    const contract = await Contract.deploy();

    await contract.waitForDeployment();

    console.log(`Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});