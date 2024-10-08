const { ethers } = require("hardhat");

async function main() {
    const [seller] = await ethers.getSigners(); // Get the seller's address
    const myNFTAddress = "0xEfc536A47054E26C458df88c7E3e939B277b8314"; // Replace with your MyNFT contract address
    const nftMarketplaceAddress = "0xFbf4B3E81803352f83019d05b8A30b83924500A2"; // Replace with your NFTMarketplace contract address

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = MyNFT.attach(myNFTAddress);

    const tokenId = 1; // Replace with the minted token ID

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
