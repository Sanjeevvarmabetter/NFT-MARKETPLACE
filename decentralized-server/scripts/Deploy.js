const { ethers } = require("hardhat");

async function main() {
    // Deploying MyNFT contract
    const MyNFT = await ethers.getContractFactory("NFT");
    console.log("Deploying MyNFT...");
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();    
    console.log("MyNFT deployed to:", myNFT.target);

    // Deploying NFTMarketplace contract
    const NFTMarketplace = await ethers.getContractFactory("Marketplace");
    console.log("Deploying NFTMarketplace...");
    const nftMarketplace = await NFTMarketplace.deploy(myNFT.target);
    await nftMarketplace.waitForDeployment(); 
    console.log("NFTMarketplace deployed to:", nftMarketplace.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
