const { ethers } = require("hardhat");

async function main() {
    const [buyer] = await ethers.getSigners(); 
    console.log(`Buyer Address: ${buyer.address}`);

    const balance = await buyer.getBalance();
    console.log(`Buyer balance: ${ethers.utils.formatEther(balance)} ETH`);

    const nftMarketplaceAddress = "0x7575870F2A9b0D29D774599e49dBc391e830a27C"; 
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach(nftMarketplaceAddress); 

    const listingId = 0; 
    const listingPrice = ethers.utils.parseEther("0.1"); 
    console.log(`Buying NFT with Listing ID: ${listingId} for ${ethers.utils.formatEther(listingPrice)} ETH...`);

    try {
        if (balance.lt(listingPrice)) {
            throw new Error("Insufficient balance to buy the NFT.");
        }

        const tx = await nftMarketplace.buyItem(listingId, { value: listingPrice, gasLimit: 300000 });
        console.log("Transaction Sent. Waiting for confirmation...");

        await tx.wait();
        console.log(`NFT with Listing ID: ${listingId} purchased successfully!`);
    } catch (error) {
        console.error("Transaction failed:", error.message || error);
        if (error.data && error.data.message) {
            console.error(`Revert reason: ${error.data.message}`);
        }
        if (error.code) {
            console.error(`Error code: ${error.code}`);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Fatal Error:", error);
        process.exit(1);
    });
