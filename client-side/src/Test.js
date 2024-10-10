import React, { useEffect, useState } from 'react';

const NFTDisplay = () => {
  const [nftDataList, setNftDataList] = useState([]);
  const metadataHashes = [
    'QmYD97zZfXHKZv7DJDWrxQyUPAxSdrPDJ2dctzZTq8PFmT',
    'QmVrzkBbHzegZsm5DV9h83EANoNEwGRwkaFbtja1h2Tvi9',
    'QmefqMdVSbTHV1SNafHpdNyYu2pCJDd6JNoZrM4TkZ946T',
    'QmY3xQFLbnyuhAoAR1AbNLrQmNEzHrGwLstANZ529XV2sM',
    'QmSq7nMLEN9qc2kzcL21BpeLXwu4ndC8wcS6eBDBxNpW2j',
    'QmdPwmgJxHqtN9NfbgwjvZZvMQVQGMXUUQPZAe85kBF4KE',
  ];

  useEffect(() => {
    const fetchNFTData = async () => {
      const nftDataPromises = metadataHashes.map(async (hash) => {
        try {
          const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          // Update the image URL format to use HTTP
          return {
            ...data,
            image: data.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
          };
        } catch (error) {
          console.error(`Error fetching NFT metadata for hash ${hash}:`, error);
          return null; // Return null for failed fetches
        }
      });

      // Wait for all promises to resolve
      const results = await Promise.all(nftDataPromises);
      // Filter out any null values (failed fetches)
      setNftDataList(results.filter(data => data !== null));
    };

    fetchNFTData();
  }, [metadataHashes]);

  if (nftDataList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nft-gallery">
      {nftDataList.map((nftData, index) => (
        <div className="nft-card" key={index}>
          <img src={nftData.image} alt={nftData.name} />
          <h3>{nftData.name}</h3>
          <p>{nftData.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTDisplay;
