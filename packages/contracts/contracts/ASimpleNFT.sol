// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ASimpleNFT is ERC721 {
    constructor() public ERC721("ASimpleNFT", "ASNFT") {}

    function mint(uint256 tokenId) public {
        _mint(msg.sender, tokenId);
    }
}
