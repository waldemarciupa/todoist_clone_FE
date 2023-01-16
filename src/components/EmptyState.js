import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 220px;
`;

const Title = styled.p`
  text-align: center;
  margin: 8px 0;
`;

const Paragraph = styled.p`
  font-size: 13px;
  color: #777;
  text-align: center;
  margin: 8px 0;
`;

const EmptyState = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
      <div>
        <Title>All clear</Title>
        <Paragraph>
          Looks like everything's organized in the right place.
        </Paragraph>
      </div>
    </Wrapper>
  );
};

export default EmptyState;
