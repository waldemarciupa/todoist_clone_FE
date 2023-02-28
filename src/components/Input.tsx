import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface StyledInputProps {
  mb: string;
}

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  id: string;
  name: string;
  mb: string;
  value: string;
}

const StyledInput = styled.input<StyledInputProps>`
  display: block;
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  padding: 0.75em 1em;
  margin-bottom: ${(props) => (props.mb ? props.mb : '5px')};
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Input = ({ onChange, type, id, name, mb, value }: InputProps) => {
  return (
    <StyledInput
      onChange={onChange}
      type={type}
      id={id}
      name={name}
      mb={mb}
      value={value}
      required
    />
  );
};

export default Input;
