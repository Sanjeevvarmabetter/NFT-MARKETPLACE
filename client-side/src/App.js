import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Listing from "./Listing";
import MyCollection from "./MyCollection";
import NFTDisplay from "./Test";
import Upload from "./Upload";
function App() {
  return (
    <Router>
      <div className="MainApp">
        {/* Navigation Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              NFT Marketplace
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/my-collection">
              My Collection
            </Button>
            <Button color="inherit" component={Link} to="/upload">
            Sell NFT
            </Button>
            
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/test" element={<NFTDisplay />} />
            <Route path="/my-collection" element={<MyCollection />} />
            {/* Fallback Route for 404 */}
            <Route
              path="*"
              element={<h1>404 - Page Not Found</h1>}
            />

<Route path="/upload" element={<Upload />} /></Routes>

        </Container>
      </div>
    </Router>
  );
}

export default App;