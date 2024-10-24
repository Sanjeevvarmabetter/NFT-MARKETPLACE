const { ethers } = require("hardhat");

async function main() {
    // Deploying MyNFT contract
    const MyNFT = await ethers.getContractFactory("MyNFT");
    console.log("Deploying MyNFT...");
    const myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();    
    console.log("MyNFT deployed to:", myNFT.target);

    // Deploying NFTMarketplace contract
    const NFTMarketplace = await ethers.getContractFactory("MarketPlace");
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


//new

/*

Deploying MyNFT...
MyNFT deployed to: 0xEaA5a368b47B399cf889213ED2112cf1937DB397
Deploying NFTMarketplace...
NFTMarketplace deployed to: 0x7575870F2A9b0D29D774599e49dBc391e830a27C


*/


// 0x38A86E766F763C6715ADdD783bB9ae2a289D6C1a


// 0xbeD1CaE50Fa7aa17B99EF5b02c91027d15f480dB




// polygon



