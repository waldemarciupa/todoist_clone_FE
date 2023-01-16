import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  font-weight: 700;
  font-size: 13px;
  margin: 5px 0;
`;

const Label = ({ children, htmlFor }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
