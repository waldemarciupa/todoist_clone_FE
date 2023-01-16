import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
  color: #1f1f1f;
`;

const Image = styled.img`
  max-width: 428px;
  width: 100%;
  height: auto;
`;

const Paragraph = styled.p`
  font-size: 19px;
  margin-top: 0;
  margin-bottom: 32px;
`;

const StyledLink = styled(Link)`
  background: #e44232;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Image
        width='428px'
        height='235px'
        alt='Not found'
        src='/images/notfound.webp'
      />
      <h1>Hmmm, that page doesn’t exist.</h1>
      <Paragraph>Get back to organizing your work and life</Paragraph>
      <StyledLink to='/'>Home</StyledLink>
    </Wrapper>
  );
};

export default NotFound;
