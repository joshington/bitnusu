import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { initWeb3, contract, web3 } from '../../utils/web3';

import { useRouter } from 'next/router';

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
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 17px;
  margin-top: 20px;
  width: 200px;
  margin-right: 30px;
`;

const NewButton = styled.button`
  padding: 10px;
  background-color: white;
  color: #000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 17px;
  margin-top: 20px;
  width: 200px;
  margin-right: 30px;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MyButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyButton2 = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MyModal = ({ show, handleClose, handleDeposit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeposit(amount);
  };

  if (!show) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <h2>Deposit</h2>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="amount">Enter Amount:</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount in cUSD"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <MyButton type="submit">Deposit</MyButton>
          </Form>
        </ModalBody>
        <ModalFooter>
          <MyButton2 onClick={handleClose}>Close</MyButton2>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      await initWeb3();
      await loadBalance();
    };
    init();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const loadBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    const balance = await contract.methods.getBalance(accounts[0]).call();
    setBalance(balance);
  };

  const handleDeposit = async (amount) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.deposit().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether'),
    });
    await loadBalance();
    handleClose();
  };

  const handleWithdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.withdraw().send({
      from: accounts[0],
    });
    await loadBalance();
  };

  return (
    <Layout>
      <h2 style={{ paddingTop: '50px', paddingLeft: '50px', fontSize: '30px', fontWeight: 'bold' }}>
        My Wallet
      </h2>
      <GiftCardContainer>
        <div
          style={{
            backgroundColor: 'blue',
            width: '600px',
            padding: '40px 50px',
            borderRadius: '20px',
            marginTop: '20px',
          }}
        >
          <div style={{ paddingTop: '40px' }}>
            <h2>Total Balance</h2>
            <h3 style={{ marginTop: '30px', fontSize: '40px', color: 'white' }}>{balance} cUSD</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button onClick={handleShow}>Deposit</Button>
            <NewButton onClick={handleWithdraw}>Withdraw</NewButton>
          </div>
          {showModal ? <MyModal show={true} handleClose={handleClose} handleDeposit={handleDeposit} /> : ''}
        </div>
      </GiftCardContainer>
    </Layout>
  );
};

export default Wallet;