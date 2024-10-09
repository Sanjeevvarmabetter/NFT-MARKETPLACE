const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners(); 
    console.log(`Owner Address: ${owner.address}`);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = MyNFT.attach("0xEaA5a368b47B399cf889213ED2112cf1937DB397"); 

    // const tokenURI = "https://gateway.pinata.cloud/ipfs/QmctowMbQd6R4KfMFcbER46PhUmX1D3C2wvDdVsSBex1nX";
    const tokenURI = "https://gateway.pinata.cloud/ipfs/QmdPwmgJxHqtN9NfbgwjvZZvMQVQGMXUUQPZAe85kBF4KE";
    console.log("Minting NFT...");
    const tx = await myNFT.createNFT(tokenURI);
    await tx.wait();
    console.log("NFT minted successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Fatal Error:", error);
        process.exit(1);
    });

