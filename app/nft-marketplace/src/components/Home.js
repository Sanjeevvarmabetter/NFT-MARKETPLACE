import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Button } from 'react-bootstrap';

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  
  const DECIMALS = 18; // Decimals for Ether

  const loadMarketplaceItems = async () => {
    setLoading(true);
    try {
      const itemCount = await marketplace.itemCount();
      let loadedItems = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i);
        
        // Ensure item is not sold before proceeding
        if (!item.sold) {
          const uri = await nft.tokenURI(item.tokenId);
          try {
            const response = await fetch(uri);
            const metadata = await response.json();

            // Convert price from wei to eth
            const formattedPrice = ethers.utils.formatUnits(item.price, DECIMALS);

            loadedItems.push({
              itemId: item.itemId.toString(),
              seller: item.seller,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
              price: formattedPrice, // Store formatted price here
            });
          } catch (error) {
            console.error(`Failed to load metadata for token ${item.tokenId}:`, error);
          }
        }
      }
      setItems(loadedItems);
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setLoading(false);
    }
  };

  const buyMarketItem = async (item) => {
    try {
      const totalPrice = await marketplace.getTotalPrice(item.itemId);
      
      // Log total price in wei for transaction
      console.log('ItemId:', item.itemId);
      console.log('Total Price (in wei):', totalPrice.toString());

      const transaction = await marketplace.purchaseItem(item.itemId, {
        value: totalPrice,
        gasLimit: 500000, // Adjust gas limit if necessary
      });

      await transaction.wait();
      console.log('Transaction successful:', transaction);

      // Reload items after purchase
      loadMarketplaceItems();
    } catch (error) {
      console.error('Error purchasing item:', error);
    }
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <div className="card" style={{ width: '18rem' }}>
                  <img className="card-img-top" src={item.image} alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>

                    {/* Display the price in ETH */}
                    <p>Price: {item.price} ETH</p>

                    <Button 
                      variant="primary" 
                      onClick={() => buyMarketItem(item)}
                    >
                      Buy NFT
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: '1rem 0' }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
};

export default Home;
