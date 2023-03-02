import styled from 'styled-components';

export const StyledLogin = styled.div`
  min-height: calc(100vh - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;

  @media (max-width: 400px) {
    background: #fff;
    align-items: flex-start;
  }
`;

export const LoginForm = styled.form`
  width: 450px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background: #fff;
  margin: 50px 0;
  padding: 25px;

  @media (max-width: 400px) {
    border: none;
  }
`;
