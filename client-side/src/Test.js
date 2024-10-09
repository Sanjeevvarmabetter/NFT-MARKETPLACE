import React, { useEffect, useState } from 'react';

const NFTDisplay = () => {
  const [nftData, setNftData] = useState(null);
  const metadataHash = 'QmVrzkBbHzegZsm5DV9h83EANoNEwGRwkaFbtja1h2Tvi9'; // Your metadata hash

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        // Fetching metadata from IPFS
        const response = await fetch(`https://ipfs.io/ipfs/${metadataHash}`);
        
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update the image URL format to use HTTP
        const updatedData = {
          ...data,
          image: data.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
        };

        setNftData(updatedData);
      } catch (error) {
        console.error('Error fetching NFT metadata:', error);
      }
    };

    fetchNFTData();
  }, [metadataHash]);

  if (!nftData) {
    return <div>Loading...</div>;
  }

  const { image, name, description } = nftData; // Adjust according to your metadata structure

  return (
    <div className="nft-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default NFTDisplay;
