import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  font-weight: 700;
  font-size: 13px;
  margin: 5px 0;
`;

interface LabelProps {
  children: ReactNode;
  htmlFor: string;
}

const Label = ({ children, htmlFor }: LabelProps) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
