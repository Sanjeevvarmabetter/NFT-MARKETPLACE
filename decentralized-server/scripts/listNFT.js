const { ethers } = require("hardhat");
async function main() {
    const [seller] = await ethers.getSigners(); // Get the seller's address
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach("0x7575870F2A9b0D29D774599e49dBc391e830a27C"); // Replace with your deployed address

    const tokenId = 6; // change the tokenID accoring to the cunter 
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
