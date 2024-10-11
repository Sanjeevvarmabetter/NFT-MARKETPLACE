import { useState } from 'react';
import { ethers } from "ethers";
import { Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // Pinata API credentials
  const pinataApiKey = "20a1ac93e10b67f081c5";
  const pinataSecretApiKey = "2b3680b650e07a507c4df5a9649b9b6438d7f8e4c3cc0cfab22a73bb968d02d7";

  const uploadToPinata = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          }
        });
        const imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setImage(imageUrl);
      } catch (error) {
        console.log("Pinata image upload error: ", error);
      }
    }
  }

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;

    try {
      const metadata = {
        image,
        price,
        name,
        description
      };

      const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        }
      });
      await mintThenList(response.data);
    } catch (error) {
      console.log("Pinata metadata upload error: ", error);
    }
  }

  const mintThenList = async (result) => {
    const uri = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;

    try {
      // Mint NFT
      const tx = await nft.createNFT(uri);
      const receipt = await tx.wait();
      const tokenId = receipt.events[0].args.tokenId; // Get the tokenId from the event args

      // Approve marketplace to spend NFT
      await nft.setApprovalForAll(marketplace.address, true);
      
      // Add NFT to marketplace
      const listingPrice = ethers.utils.parseEther(price.toString());
      await marketplace.makeItem(nft.address, tokenId, listingPrice);
    } catch (error) {
      console.log("Error in minting or listing NFT: ", error);
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToPinata}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create;
