import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

import { useState, useEffect } from 'react';

import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import hero from '../images/hero.png';
import styled from 'styled-components';

import { ContractKitProvider, ContractKit } from '@celo/contractkit';
import { useRouter } from 'next/router';

import { contractAddress, cUSDContractAddress } from '@/utils/constants';

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

  const [account, setAccount] = useState(null);


  const [message, setMessage] = useState('');

  const [kit, setKit] = useState(null);


  const [address, setAddress] = useState(null);





  const router = useRouter();

  const createCard = () => {
    router.push("/dashboard/giftcard")
  }
  const redeemCard = () => {
    router.push("/dashboard/redeem")
  }

  useEffect(() => {
   

    const init = async () => {
      if (window.celo) {
        const web3 = new Web3(window.celo);
        const kit = newKitFromWeb3(web3);
        setKit(kit);

        await window.celo.enable();
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        // window.celo.on('accountsChanged', (accounts) => {
        //   setAccount(accounts[0] || null);
        // });
      } else {
        alert('Celo extension not found. Please install it.');
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.celo) {
        alert('Celo extension not found. Please install it.');
        return;
      }
      await window.celo.enable();
      const accounts = await window.celo.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Error connecting wallet');
    }
  };






  return (
    <Layout>
      {/* <h3>Wallet: { address}</h3> */}
      <div style={{ display: "flex", flexDirection: "row", paddingTop: "60px" }}>
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