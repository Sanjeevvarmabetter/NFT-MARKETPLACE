const { ethers } = require("hardhat");

async function main() {
    // Deploying MyNFT contract
    const MyNFT = await ethers.getContractFactory("MyNFT");
    console.log("Deploying MyNFT...");
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();    
    console.log("MyNFT deployed to:", myNFT.target);

    // Deploying NFTMarketplace contract
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
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

/*

Deploying MyNFT...
MyNFT deployed to: 0xEfc536A47054E26C458df88c7E3e939B277b8314
Deploying NFTMarketplace...
NFTMarketplace deployed to: 0xFbf4B3E81803352f83019d05b8A30b83924500A2


*/