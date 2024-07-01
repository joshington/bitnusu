// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bitnusu {
    IERC20 public token;
    uint256 public feePercent = 3;

    //==adding user logics===
    struct User {
        address userAddress;
        bool isRegistered;
    }

    mapping(string => User) private users;
    mapping(address => string) private addresses;

    event UserRegistered(address indexed ueerAddress,string email);
    event UserAddressUpdated(address indexed userAddress, string email);

    
    function registerUser(string memory email, address userAddress) external {
        require(!users[email].isRegistered, "User already registered");

        users[email] = User({
            userAddress: userAddress,
            isRegistered: true
        });

        addresses[userAddress] = email;

        emit UserRegistered(userAddress, email);
    }

    function updateUserAddress(string memory email, address newUserAddress) external  {
        require(users[email].isRegistered, "User not registered");

        users[email].userAddress = newUserAddress;
        addresses[newUserAddress] = email;

        emit UserAddressUpdated(newUserAddress, email);
    }

    function getUserAddress(string memory email) external view returns (address) {
        require(users[email].isRegistered, "User not registered");
        return users[email].userAddress;
    }

    function getEmail(address userAddress) external view returns (string memory){
        return addresses[userAddress];
    }


    struct GiftCard {
        address sender;
        address recipient;
        uint256 amount;
        bool redeemed;
        string note;
    }

    mapping(string => GiftCard) public giftCards;
    mapping(address => uint256) public userBalances;

    event GiftSent(string indexed code, address indexed sender, address indexed recipient, uint256 amount);
    event GiftRedeemed(string indexed code, address indexed recipient, uint256 amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function createGiftCard(string memory code, address recipient, uint256 amount, string memory note) public {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        uint256 fee = (amount * feePercent) / 100;
        uint256 netAmount = amount - fee;
        userBalances[msg.sender] -= amount;

        giftCards[code] = GiftCard({
            sender:msg.sender,
            recipient:recipient,
            amount: netAmount,
            redeemed:false,
            note:note
        });
        emit GiftSent(code, msg.sender, recipient, netAmount);
    }

    function redeemGiftCard(string memory code) public {
        GiftCard storage card = giftCards[code];
        require(card.recipient == msg.sender, "Not the recipient");
        require(!card.redeemed, "Already redeemed");

        card.redeemed = true;
        userBalances[msg.sender] += card.amount;
        emit GiftRedeemed(code, msg.sender,card.amount);
    }

    function deposit(uint256 amount) public {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        userBalances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        userBalances[msg.sender] -= amount;
        require(token.transfer(msg.sender, amount), "Transfer failed");
    }

    function getBalance(address user) public view returns (uint256) {
        return userBalances[user];
    }

}