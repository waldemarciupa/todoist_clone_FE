import React from 'react';
import styled from 'styled-components';

const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalInner = styled.div`
  width: 550px;
  box-shadow: 0 15px 50px 0 rgb(0 0 0 / 35%);
  border-radius: 10px;
  background: #fff;
  margin: 0 32px;
`;

const TaskModal = ({ hideModal, children }) => {
  return (
    <ModalOuter onClick={hideModal}>
      <ModalInner
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </ModalInner>
    </ModalOuter>
  );
};

export default TaskModal;
