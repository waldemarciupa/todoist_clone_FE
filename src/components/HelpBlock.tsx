import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledBlock = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #dd4b39;
  text-decoration: none;
`;

interface HelpBlockProps {
  register?: boolean;
}

const HelpBlock = ({ register }: HelpBlockProps) => {
  return (
    <StyledBlock>
      {register ? (
        <p>
          Already signed up? Got to
          <StyledLink to='/users/login'> login</StyledLink>
        </p>
      ) : (
        <p>
          Don't have an account?
          <StyledLink to='/users/register'> Sign up</StyledLink>
        </p>
      )}
    </StyledBlock>
  );
};

export default HelpBlock;
