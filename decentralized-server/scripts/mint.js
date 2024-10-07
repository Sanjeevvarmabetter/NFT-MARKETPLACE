const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners(); // Get the deployer's address
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = MyNFT.attach("0xEfc536A47054E26C458df88c7E3e939B277b8314"); // Replace with your deployed address

    const tokenURI = "https://gateway.pinata.cloud/ipfs/QmctowMbQd6R4KfMFcbER46PhUmX1D3C2wvDdVsSBex1nX";
    
    console.log("Minting NFT...");
    const tx = await myNFT.createNFT(tokenURI);
    await tx.wait();
    console.log("NFT minted successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
