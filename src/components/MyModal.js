

import React from "react";
import styled from "styled-components";


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
  justify-content: flex-end;
`;


const Button = styled.button`
  background-color: #007bff;
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

const MyModal = ({ show, handleClose }) => {
    if (!show) return null;
    return (
        <ModalBackground>
            <ModalContainer>
                <ModalHeader>
                <h2>Modal title</h2>
                <Button onClick={handleClose}>Close</Button>
                </ModalHeader>
                <ModalBody>
                <p>Modal body text goes here.</p>
                </ModalBody>
                <ModalFooter>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleClose}>Save Changes</Button>
                </ModalFooter>
            </ModalContainer>
        </ModalBackground>
    )
}

export default MyModal;