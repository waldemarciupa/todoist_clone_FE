import styled from 'styled-components';

const StyledError = styled.div`
  color: #ff0000;
  min-height: 20px;
  margin-bottom: 5px;
`;

const Error = ({ children }) => {
  return <StyledError>{children}</StyledError>;
};

export default Error;
