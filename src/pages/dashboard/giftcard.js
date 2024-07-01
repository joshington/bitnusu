// pages/dashboard/giftcard.js
import React, { useState,useEffect } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import Image from 'next/image';
import xmas from '../../images/xmas.png';
import bd from '../../images/bd.png';

import { useRouter } from 'next/router';
import { initWeb3, contracts } from '@/utils/web3';


const GiftCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom:50px;
`;

const CardSelection = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  justify-content:space-around;
`;

const Card = styled.div`
  margin: 0 10px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '2px solid #0070f3' : '2px solid transparent')};
  &:hover {
    border: 2px solid #0070f3;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size:17px;
  margin-top:20px;
`;

const CardButton = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right:30px;
  width:220px;
  font-size:20px;
`;



const Giftcard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [fee, setFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

   useEffect(() => {
    const init = async () => {
      await initWeb3();
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      setWalletBalance(web3.utils.fromWei(balance, 'ether'));
    };
    init();
  }, []);

 



  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const code = Math.random().toString(36).substring(2, 15);

      await contract.methods.createGiftCard(code, recipientEmail, amount, note).send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether') // Assuming the amount is in ether
      });

      alert("Gift card created successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the gift card.");
    }
  };


  const redeem = (e) => {
    e.preventDefault();
    router.push('/dashboard/redeem');

  }
  return (
    <Layout>
      <h2>Create a Gift Card</h2>
      <GiftCardContainer>
        <CardSelection>
          <CardButton>
            Create
          </CardButton> 
          <CardButton onClick={redeem}>
            Redeem
          </CardButton>
        </CardSelection>
        <h3 style={{ textAlign: 'left' }}>Select your gift card design</h3>
        <div>
          <Image 
            src={xmas}
            width={250}
            height={150}
            alt="xmas"
            onClick={() => handleCardSelect('xmas')}
            style={{ border: selectedCard === 'xmas' ? '2px solid #0070f3' : '2px solid transparent' }}
          />
          <Image 
            src={bd}
            width={250}
            height={150}
            alt="bd"
            onClick={() => handleCardSelect('bd')}
            style={{ border: selectedCard === 'bd' ? '2px solid #0070f3' : '2px solid transparent' }}
          />
        </div>
        <Form onSubmit={handleSubmit}>
          {/* <Label htmlFor="currency">Select Currency:</Label>
          <Input id="currency" type="text" placeholder="Select coin" required /> */}
          <Label htmlFor="amount">Enter Amount:</Label>
         <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setFee(e.target.value * 0.03); // Assuming a 3% fee
              setTotalAmount(Number(e.target.value) + e.target.value * 0.03);
            }}
            required
          />
          <h4>Wallet Balance: {walletBalance} cUSD</h4>
          <Label htmlFor="note">Note (optional):</Label>
          <Input
            id="note"
            type="text"
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Label htmlFor="note">Recipient Email:</Label>
          <Input
            id="recipientEmail"
            type="email"
            placeholder="Add Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
          <div>
            <h3>Fees: {fee} cUSD</h3>
            <h3>Total Amount: {totalAmount} cUSD</h3>
          </div>
          <Button type="submit">Create & Send</Button>
        </Form>
       
      </GiftCardContainer>
    </Layout>
  );
};

export default Giftcard;
