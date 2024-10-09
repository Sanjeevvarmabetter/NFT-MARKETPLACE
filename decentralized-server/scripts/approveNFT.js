const { ethers } = require("hardhat");

async function main() {
    const [seller] = await ethers.getSigners(); // Get the seller's address
    const myNFTAddress = "0xEaA5a368b47B399cf889213ED2112cf1937DB397"; // Replace with your MyNFT contract address
    const nftMarketplaceAddress = "0x7575870F2A9b0D29D774599e49dBc391e830a27C"; // Replace with your NFTMarketplace contract address

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = MyNFT.attach(myNFTAddress);

    const tokenId =  6;// Replace with the minted token ID

    console.log("Approving NFT for marketplace...");
    const tx = await myNFT.approve(nftMarketplaceAddress, tokenId);
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`NFT approved for marketplace: ${nftMarketplaceAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
