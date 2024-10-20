// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract MyNFT is  ERC721URIStorage, Ownable {
    uint256 public tokencounter;

    constructor() ERC721("MyNFT","MNFT") Ownable(msg.sender) {
        tokencounter = 0;
    }


    function createNFT(string memory tokenURI) public  returns(uint256) {
        uint256 newTokenId  = tokencounter;
        _safeMint(msg.sender,newTokenId);
        _setTokenURI(newTokenId,tokenURI);
        tokencounter+= 1;
        return newTokenId;
    }

}
