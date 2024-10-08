import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import abi from "./NFTabi.json";
import Marketabi from "./Marketabi.json";

const NFTMarketplaceAddress = process.env.REACT_APP_NFT_MARKETPLACE_ADDRESS;
const MyNFTAddress = process.env.REACT_APP_MY_NFT_ADDRESS;
const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY; 
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY; 



const Upload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const uploadToPinata = async (imageFile) => {
        const uploadFile = async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, formData, {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });

            return `ipfs://${response.data.IpfsHash}`;
        };

        const uploadMetadata = async (metadata) => {
            const response = await axios.post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, metadata, {
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            });

            return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        };

        try {
            const imageUrl = await uploadFile(imageFile);
            const metadata = {
                name: title,
                description,
                external_url: "https://pinata.cloud",
                image: imageUrl,
            };
            const metadataUrl = await uploadMetadata(metadata);
            return metadataUrl; // Return the metadata URL for minting
        } catch (error) {
            console.error("Error uploading to Pinata:", error);
            setMessage("Error uploading to Pinata. Please try again.");
            setLoading(false);
            return null;
        }
    };

    const mintApproveAndListNFT = async (tokenURI, price) => {
        const count = 9;

        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const MyNFT = new ethers.Contract(MyNFTAddress, abi.abi, signer);
            const NFTMarketplace = new ethers.Contract(NFTMarketplaceAddress, Marketabi.abi, signer);

            try {

                const tx = await MyNFT.createNFT(tokenURI);
                const receipt = await tx.wait();

                const mintedTokenId = count; 

                await MyNFT.approve(NFTMarketplaceAddress, mintedTokenId); 


                const listTx = await NFTMarketplace.listItem(mintedTokenId, ethers.utils.parseEther(price));
                await listTx.wait();

                setMessage("NFT minted, approved, and listed successfully!");
                return mintedTokenId;
            } catch (error) {
                console.error("Error minting, approving, or listing NFT:", error);
                setMessage("Error occurred. Please try again.");
            }
        } else {
            setMessage("Ethereum object not found. Please install MetaMask.");
        }
    };

    const handleUploadAndMint = async (event) => {
        event.preventDefault();
        setLoading(true);
        const tokenURI = await uploadToPinata(file);
        console.log(tokenURI);
        if (!tokenURI) return; 


        const price = "0.1"; 

        await mintApproveAndListNFT(tokenURI, price); 
        setLoading(false);
    };

    return (
        <div className="upload-container">
            <h1>Upload NFT</h1>
            <form onSubmit={handleUploadAndMint}>
                <input type="file" onChange={handleFileChange} required />
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Mint and List NFT"}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};


export default Upload;
