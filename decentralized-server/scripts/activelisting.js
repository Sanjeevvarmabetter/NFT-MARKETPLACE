const { ethers } = require("hardhat");

async function fetchActiveListings() {
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = NFTMarketplace.attach("0xFbf4B3E81803352f83019d05b8A30b83924500A2"); 

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
