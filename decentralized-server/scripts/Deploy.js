const { ethers } = require("hardhat");

async function main() {
    // Deploying MyNFT contract


        const MyNFT = await ethers.getContractFactory("MNFT");
        console.log("Deploying NFT and marketplace");

        const mynft = await MyNFT.deploy();

        console.log("MyNFT deployed at: ",mynft.address);

    // Deploying NFTMarketplace contract
    // const NFTMarketplace = await ethers.getContractFactory("Marketplace");
    // console.log("Deploying NFTMarketplace...");
    // const nftMarketplace = await NFTMarketplace.deploy(myNFT.target);
    // await nftMarketplace.waitForDeployment(); 
    // console.log("NFTMarketplace deployed to:", nftMarketplace.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });




    // new NFT address

    // 0x57CBf9634BadF9eF105b5BECB20b669828909E6d


    // 0x2c143F5c255656c1CD145A9C42D58066BDd6Eb7D


//   // Pinata API credentials
//   const pinataApiKey = "20a1ac93e10b67f081c5";
//   const pinataSecretApiKey = "2b3680b650e07a507c4df5a9649b9b6438d7f8e4c3cc0cfab22a73bb968d02d7";
  