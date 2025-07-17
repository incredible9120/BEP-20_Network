// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HUMToken is ERC20, Ownable {
    address public treasury;
    uint256 public feeBasisPoints = 150; // 1.5% = 150 basis points
    uint256 public constant FEE_DENOMINATOR = 10000;
    uint256 public maxWalletSize;
    uint256 public maxTxAmount;

    event TreasuryChanged(address indexed previousTreasury, address indexed newTreasury);
    event FeeChanged(uint256 previousFee, uint256 newFee);
    event MaxWalletSizeChanged(uint256 previousSize, uint256 newSize);
    event MaxTxAmountChanged(uint256 previousAmount, uint256 newAmount);

    constructor(
        address _treasury,
        uint256 _initialSupply,
        uint256 _maxWalletSize,
        uint256 _maxTxAmount
    ) ERC20("HUM Token", "HUM") {
        require(_treasury != address(0), "Treasury address cannot be zero");
        treasury = _treasury;
        _mint(msg.sender, _initialSupply);
        maxWalletSize = _maxWalletSize > 0 ? _maxWalletSize : _initialSupply / 20; // default: 5% of supply
        maxTxAmount = _maxTxAmount > 0 ? _maxTxAmount : _initialSupply / 100; // default: 1% of supply
        transferOwnership(_treasury); // Set owner to treasury address
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Treasury address cannot be zero");
        emit TreasuryChanged(treasury, _treasury);
        treasury = _treasury;
    }

    function setFee(uint256 _feeBasisPoints) external onlyOwner {
        require(_feeBasisPoints <= 500, "Fee too high"); // Max 5%
        emit FeeChanged(feeBasisPoints, _feeBasisPoints);
        feeBasisPoints = _feeBasisPoints;
    }

    function setMaxWalletSize(uint256 _maxWalletSize) external onlyOwner {
        emit MaxWalletSizeChanged(maxWalletSize, _maxWalletSize);
        maxWalletSize = _maxWalletSize;
    }

    function setMaxTxAmount(uint256 _maxTxAmount) external onlyOwner {
        emit MaxTxAmountChanged(maxTxAmount, _maxTxAmount);
        maxTxAmount = _maxTxAmount;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override {
        require(amount <= maxTxAmount, "Transfer amount exceeds maxTxAmount");
        if (recipient != owner() && recipient != treasury && recipient != address(this)) {
            require(balanceOf(recipient) + amount <= maxWalletSize, "Recipient exceeds max wallet size");
        }
        uint256 fee = (amount * feeBasisPoints) / FEE_DENOMINATOR;
        uint256 amountAfterFee = amount - fee;
        if (fee > 0) {
            super._transfer(sender, treasury, fee);
        }
        super._transfer(sender, recipient, amountAfterFee);
    }
} 