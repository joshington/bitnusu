// components/Layout.js
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  padding: 20px;
  color: #ecf0f1;
`;

const Main = styled.div`
  flex-grow: 1;
  background-color: #ecf0f1;
  padding: 20px;
`;

const NavItem = styled.a`
  display: block;
  padding: 10px 0;
  height:70px;
  color: #ecf0f1;
  text-decoration: none;
  &:hover {
    background-color: #34495e;
  }
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <h1>Dashboard</h1>
        <nav>
            <Link href="/dashboard" passHref>
                <NavItem>Home</NavItem>
            </Link>
            <Link href="/dashboard/giftcard" passHref>
                <NavItem>Giftcard</NavItem>
            </Link>
            <Link href="/dashboard/spend" passHref>
                <NavItem>Spend</NavItem>
            </Link>
            <Link href="/dashboard/wallet" passHref>
                <NavItem>Wallet</NavItem>
            </Link>
        </nav>
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;