import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  text-align: center;
  display: block;
  height: auto;
  width: ${(props) => (props.width ? props.width : '100%')};
  font-size: 13px !important;
  font-weight: 700;
  padding: 9px 12px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: ${(props) => (props.primary ? '#db4c3f' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#db4c3f')};
  border: 1px solid ${(props) => (props.primary ? 'transparent' : '#db4c3f')};

  &:hover {
    background-color: ${(props) => (props.primary ? '#c53727' : '#fff')};
    box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  }
`;

const Button = ({ clickHandler, children, primary, type, title, width }) => {
  return (
    <StyledButton
      title={title}
      onClick={clickHandler}
      type={type}
      primary={primary}
      width={width}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
