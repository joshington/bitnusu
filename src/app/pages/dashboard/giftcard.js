// pages/dashboard/giftcard.js
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';

const GiftCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardSelection = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
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
  width: 300px;
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
`;

const Giftcard = () => {
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
      <h2>Create a Gift Card</h2>
      <GiftCardContainer>
        <CardSelection>
          {/* Replace with actual images */}
          {['Card1', 'Card2', 'Card3'].map((card, index) => (
            <Card key={index} selected={selectedCard === card} onClick={() => handleCardSelect(card)}>
              <img src={`/images/${card}.png`} alt={card} width="100" />
            </Card>
          ))}
        </CardSelection>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="currency">Select Currency:</Label>
          <Input id="currency" type="text" placeholder="Select coin" required />
          <Label htmlFor="amount">Enter Amount:</Label>
          <Input id="amount" type="number" placeholder="Enter amount" required />
          <Label htmlFor="note">Note (optional):</Label>
          <Input id="note" type="text" placeholder="Add a note" />
          <Button type="submit">Create</Button>
        </Form>
      </GiftCardContainer>
    </Layout>
  );
};

export default Giftcard;
