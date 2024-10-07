const { ethers } = require("hardhat");

async function main() {
    // Retrieve the buyer's signer
    const [buyer] = await ethers.getSigners(); 
    console.log(`Buyer Address: ${buyer.address}`);

    // Check buyer's ETH balance
    const balance = await buyer.getBalance();
    console.log(`Buyer balance: ${ethers.utils.formatEther(balance)} ETH`);

    // Attach to the deployed NFTMarketplace contract
    const nftMarketplaceAddress = "0xFbf4B3E81803352f83019d05b8A30b83924500A2"; // Replace with your contract address
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach(nftMarketplaceAddress); 

    // Define the listing ID and listing price
    const listingId = 0; // Replace with the correct listing ID
    const listingPrice = ethers.utils.parseEther("0.1"); // The price you want to pay

    console.log(`Buying NFT with Listing ID: ${listingId} for ${ethers.utils.formatEther(listingPrice)} ETH...`);

    try {
        // Execute the buyItem function with the specified listingId and value
        const tx = await nftMarketplace.buyItem(listingId, { value: listingPrice, gasLimit: 300000 });
        console.log("Transaction Sent. Waiting for confirmation...");

        // Wait for the transaction to be mined
        await tx.wait();
        console.log(`NFT with Listing ID: ${listingId} purchased successfully!`);
    } catch (error) {
        // Enhanced error logging
        console.error("Transaction failed:", error);

        // If available, print the revert reason
        if (error.data && error.data.message) {
            console.error(`Revert reason: ${error.data.message}`);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Fatal Error:", error);
        process.exit(1);
    });
