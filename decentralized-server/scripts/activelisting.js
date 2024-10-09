const { ethers } = require("hardhat");

async function fetchActiveListings() {
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach("0x7575870F2A9b0D29D774599e49dBc391e830a27C"); 

    try {
        const activeListings = await nftMarketplace.fetchActiveListings();
        
        console.log("Active Listings: ", activeListings);
    } catch (error) {
        console.error("Error fetching active listings: ", error);
    }
}

fetchActiveListings()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
