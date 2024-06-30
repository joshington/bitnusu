// pages/dashboard/giftcard.js
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import Image from 'next/image';
import xmas from '../../images/xmas.png';
import bd from '../../images/bd.png';


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
  background-color:EEF7FF;kn/
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


const Redeem = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Layout>
      <h2 style={{ paddingTop: "70px", paddingLeft: "70px", fontSize: "40px",paddingBottom:"40px" }}>
        Create a Gift Card
      </h2>
      <GiftCardContainer>
        <CardSelection>
          <CardButton>
            Create
          </CardButton> 
          <CardButton>
            Redeem
          </CardButton>
        </CardSelection>
        <Form onSubmit={handleSubmit}>
          {/* <Label htmlFor="currency">Select Currency:</Label>
          <Input id="currency" type="text" placeholder="Select coin" required /> */}
          <Label htmlFor="amount">Enter Your Gift Card Code:</Label>
          <Input id="amount" type="number" placeholder="Paste Code" required />
          
          <Button type="submit">Redeem</Button>
        </Form>  
      </GiftCardContainer>
    </Layout>
  );
};

export default Redeem;
