// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FidelityToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(_msgSender()) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override(ERC20) returns(bool) {
        require(to == address(0), "TokenPOF: transfers are only allowed to the burn address");
        super._transfer(from, to, amount);
    }
}

