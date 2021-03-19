// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EntropyNFT is ERC721, Ownable {
    bool initialized = false;

    constructor() public ERC721("Entropy", "ENT") {}

    function _mintGenesis(
        uint256 bit,
        uint8 from,
        uint8 to
    ) internal {
        require(!initialized, "genesis has happened already");
        for (uint8 n = from; n < to; n++) {
            bit = bit * 2;
            _mint(msg.sender, bit);
        }
    }

    function genesis1() public onlyOwner {
        uint256 bit = uint256(1);
        _mint(msg.sender, bit);
        _mintGenesis(bit, 1, 32);
    }

    function genesis2() public onlyOwner {
        uint256 bit = (uint256(2)**32);
        _mintGenesis(bit, 32, 64);
        initialized = true;
    }

    function operateOr(uint256 tokenId1, uint256 tokenId2)
        public
        pure
        returns (uint256)
    {
        return tokenId1 | tokenId2;
    }

    function mintWithTokens(uint256[] memory tokenIds) public {
        require(
            tokenIds.length > 1 && tokenIds.length < 20,
            "we dont accept more than 20 seed tokens"
        );
        require(ownerOf(tokenIds[0]) == msg.sender, "You don't own that token");
        uint256 result = tokenIds[0];
        for (uint8 i = 1; i < tokenIds.length; i++) {
            require(
                ownerOf(tokenIds[i]) == msg.sender,
                "You don't own that token"
            );
            result = operateOr(result, tokenIds[i]);
        }
        _mint(msg.sender, result);
    }
}
