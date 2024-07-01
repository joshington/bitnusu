// pages/dashboard/giftcard.js
import React, { useState,useEffect} from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { initWeb3, contract } from '@/utils/web3'; 

const GiftCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const CardSelection = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  justify-content: space-around;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: #eef7ff;
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
  font-size: 17px;
  margin-top: 20px;
`;

const CardButton = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
  width: 220px;
  font-size: 20px;
`;

const Redeem = () => {
  const [giftCardCode, setGiftCardCode] = useState('');

  useEffect(() => {
    const init = async () => {
      await initWeb3();
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.redeemGiftCard(giftCardCode).send({
        from: accounts[0],
      });
      alert('Gift card redeemed successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while redeeming the gift card.');
    }
  };

  return (
    <Layout>
      <h2 style={{ paddingTop: '70px', paddingLeft: '70px', fontSize: '40px', paddingBottom: '40px' }}>
        Create a Gift Card
      </h2>
      <GiftCardContainer>
        <CardSelection>
          <CardButton>Create</CardButton>
          <CardButton>Redeem</CardButton>
        </CardSelection>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="code">Enter Your Gift Card Code:</Label>
          <Input
            id="code"
            type="text"
            placeholder="Paste Code"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value)}
            required
          />
          <Button type="submit">Redeem</Button>
        </Form>
      </GiftCardContainer>
    </Layout>
  );
};

export default Redeem;
