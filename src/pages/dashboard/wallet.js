// pages/dashboard/giftcard.js
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import Image from 'next/image';
import xmas from '../../images/xmas.png';
import bd from '../../images/bd.png';

import { useRouter } from 'next/router';



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
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size:17px;
  margin-top:20px;
  width:200px;
  margin-right:30px;
`;

const NewButton = styled.button`
  padding: 10px;
  background-color: white;
  color: #000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size:17px;
  margin-top:20px;
  width:200px;
  margin-right:30px;
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

  const router = useRouter();

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const redeem = (e) => {
    e.preventDefault();
    router.push('/dashboard/redeem');

  }
    
  return (
    <Layout>
        <h2 style={{ paddingTop: "50px", paddingLeft: "50px", fontSize: "30px",fontWeight:"bold"}}>
            My Wallet
        </h2>
        <GiftCardContainer>
            <div style={{
                backgroundColor: "blue", width: "600px",
                padding: "40px 50px", borderRadius: "20px", marginTop: "20px"
            }}>
                <div style={{paddingTop:"40px"}}>
                  <h2>Total Balance</h2>
                  <h3 style={{marginTop:"30px",fontSize:"40px",color:"white"}}>0.00 cUSD</h3>
                </div>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Button>
                        Deposit
                    </Button>
                    <NewButton>
                        Withdraw
                    </NewButton>    
                </div>
            </div> 
        </GiftCardContainer>
    </Layout>
  );
};

export default Giftcard;
