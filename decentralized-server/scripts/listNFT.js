const { ethers } = require("hardhat");
async function main() {
    const [seller] = await ethers.getSigners(); // Get the seller's address
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach("0xFbf4B3E81803352f83019d05b8A30b83924500A2"); // Replace with your deployed address

    const tokenId = 1; // Replace with the minted token ID
    const price = ethers.parseEther("0.1"); // Replace with the desired price

    console.log("Listing NFT...");
    const tx = await nftMarketplace.listItem(tokenId, price);
    await tx.wait();
    console.log("NFT listed successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
