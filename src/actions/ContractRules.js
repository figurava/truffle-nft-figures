// Solidity contract details to use in the front-end.
export default {
    MAX_TOKENS: 200, // 200 Figures,
    maxMint: 5, // Max 5 Figures per transaction
    price: 0.05,  // Mint price as ether
    // opensea adress to link when sold out
    openseaLink: "https://opensea.io/collection/verynormal?search[sortAscending]=true&amp;search[sortBy]=PRICE&amp;search[toggles][0]=BUY_NOW",
    // info section data,
    inventory : {
        drops : [
            {"key": "circle", "name": "Circle", "rarity": 75, "css" : "bg-red-300 text-sky-600"},
            {"key": "square", "name": "Square", "rarity": 24 , "css" : "bg-orange-300 text-red-600"},
            {"key": "triangle", "name": "Triangle", "rarity": 1, "css" : "bg-yellow-300 text-indigo-600"}
        ],
        svgs : {
            "circle" : <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="50" cy="50" r="50"/></svg>,
            "square" : <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><rect width="100" height="100"/></svg>,
            "triangle" :  <svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg" fill="currentColor"><polygon points="50 15, 100 100, 0 100" /></svg>,
        }
    }
};

