import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledError = styled.div`
  color: #ff0000;
  min-height: 20px;
  margin-bottom: 5px;
`;

interface ErrorProps {
  children: ReactNode;
}

const Error = ({ children }: ErrorProps) => {
  return <StyledError>{children}</StyledError>;
};

export default Error;
