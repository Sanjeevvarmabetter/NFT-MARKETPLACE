// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./MyNFT.sol";

contract NFTMarketplace {
    struct Listing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool isActive; 
    }

    MyNFT public nft;
    uint256 public listingCount; 

    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed listingId, uint256 indexed tokenId, address seller, uint256 price);
    event Sale(uint256 indexed listingId, uint256 indexed tokenId, address buyer, uint256 price);

    constructor(address _nftAddress) {
        nft = MyNFT(_nftAddress);
    }

    function listItem(uint256 tokenId, uint256 price) public {
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner"); 

        nft.transferFrom(msg.sender, address(this), tokenId); 


        listings[listingCount] = Listing({
            tokenId: tokenId,
            seller: payable(msg.sender),
            price: price,
            isActive: true 
        });

        emit Listed(listingCount, tokenId, msg.sender, price);
        listingCount += 1; 
    }

    function buyItem(uint256 listingId) public payable {
        Listing storage listing = listings[listingId]; 
        require(listing.isActive, "Listing is not active"); 
        require(msg.value >= listing.price, "Insufficient payment"); 
        listing.isActive = false; 
        nft.transferFrom(address(this), msg.sender, listing.tokenId); 
        
        listing.seller.transfer(msg.value);

        emit Sale(listingId, listing.tokenId, msg.sender, listing.price);
    }

    function fetchActiveListings() public view returns (Listing[] memory) {
        uint256 activeCount = 0;

    
        for (uint256 i = 0; i < listingCount; i++) {
            if (listings[i].isActive) { 
                activeCount += 1;
            }
        }

        Listing[] memory activeListings = new Listing[](activeCount);
        uint256 index = 0;


        for (uint256 i = 0; i < listingCount; i++) {
            if (listings[i].isActive) {
                activeListings[index] = listings[i];
                index += 1;
            }
        }
        
        return activeListings; 
    }


    function getOwnedNFTs(address owner) public view returns (uint256[] memory) {
        uint256 totalSupply = nft.tokencounter(); // fetch the yotal numbet of nfts

        uint256 ownerCount = 0;


        // count how many nfts does the owner hold
        for(uint256 i=0;i<totalSupply;i++) {
            if(nft.ownerOf(i) == owner) {
                ownerCount += 1;
            }   
            
            }

    uint256[] memory ownedNFTS = new uint256[](ownerCount);
    uint256 index = 0;

    for(uint256 i=0;i<totalSupply;i++) {
        if(nft.ownerOf(i)== owner) {
            ownedNFTS[index] = i;
            index += 1;
        }
    }   
    return ownedNFTS;

        }

}
