import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import hero from '../images/hero.png';
import styled from 'styled-components';


import { useRouter } from 'next/router';



const Create = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right:30px;
  width:300px;
  font-size:20px;
  height:60px;
  margin-top:40px;
`

const Redeem = styled.button`
  padding: 10px;
  background-color: gray;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right:30px;
  width:300px;
  font-size:20px;
  height:60px;
  margin-top:40px;
`

const DashboardHome = () => {

  const router = useRouter();

  const createCard = () => {
    router.push("/dashboard/giftcard")
  }
  const redeemCard = () => {
    router.push("/dashboard/redeem")
  }
  return (
    <Layout>
      <div style={{display:"flex", flexDirection:"row",paddingTop:"60px"}}>
        <div style={{padding:"50px",width:"800px"}}>
            <h2 style={{fontSize:"50px",fontWeight:"bold",color:"#0077b6"}}>Send the Gift of Crypto With Ease</h2>
          <p style={{ marginTop: "50px",fontSize:"25px" }}>
              Give the Gift of Choice: Create and redeem your crypto gift cards here at BitGifty!
          </p>
          <Create onClick={createCard}>
            Create Gift Card
          </Create>
          <Redeem onClick={redeemCard}>
            Redeem Gift Card
          </Redeem>
        </div>
        <div style={{padding:"50px"}}>
          <Image
            src={hero}
            width={400}
            height={300}
          />
        </div>
      </div>
      
    </Layout>
  );
};

export default DashboardHome;