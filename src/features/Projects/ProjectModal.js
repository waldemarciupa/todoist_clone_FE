import styled from 'styled-components';
import Button from '../../components/Button';

const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalInner = styled.div`
  width: 400px;
  border-radius: 10px !important;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0 32px;
`;

const Header = styled.div`
  padding: 0 24px;
  background-color: #fafafa;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 16px;
  margin: 0;
  padding: 14px 0;
  font-weight: 700;
`;

const FormContent = styled.div`
  padding: 24px;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  grid-auto-flow: dense;
  direction: rtl;
  grid-gap: 14px;
  padding: 14px 24px;
  border-top: 1px solid #ddd;
`;

const Modal = ({
  onClick,
  title,
  children,
  handleSubmit,
  hideProjectModal,
}) => {
  return (
    <ModalOuter onClick={onClick}>
      <ModalInner
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Header>
          <Title>{title}</Title>
        </Header>
        <form onSubmit={handleSubmit}>
          <FormContent>{children}</FormContent>
          <ButtonsWrapper>
            <Button type='submit' primary>
              {title}
            </Button>
            <Button clickHandler={hideProjectModal} type='button'>
              Cancel
            </Button>
          </ButtonsWrapper>
        </form>
      </ModalInner>
    </ModalOuter>
  );
};

export default Modal;
