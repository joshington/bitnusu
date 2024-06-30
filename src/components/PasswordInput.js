

import { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputContainer = styled.div`
  position: relative;
  width: 100%;

`;

const Input = styled.input`
//   padding: 0.75rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   width: calc(100% - 2.5rem);
    padding: 0.75rem 2.5rem 0.75rem 0.75rem; /* Add padding to accommodate the eye icon */
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const PasswordInput = ({ label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer>
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      <EyeIcon onClick={togglePasswordVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </EyeIcon>
    </InputContainer>
  );
};

export default PasswordInput;