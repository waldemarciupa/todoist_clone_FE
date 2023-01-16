import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  'Priority 1': '209, 69, 59',
  'Priority 2': '235, 137, 9',
  'Priority 3': '36, 111, 224',
  'Priority 4': '128,128,128',
};

const listItemStyles = css`
  height: 34px;
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  border-radius: 5px;
  padding: 5px 16px 5px 5px;
  cursor: pointer;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: #eee;
  }
`;

const projectBtnStyles = css`
  display: none;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const ListBox = styled.div`
  height: calc(100vh - 44px);
  overflow-y: auto;
  flex-grow: 1;
  padding: 16px 32px 84px 32px;
`;

export const DateHeader = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
  padding-left: 14px;
  color: #202020;
`;

export const DateToday = styled.span`
  color: #808080;
  font-size: 12px;
  font-weight: 400;
`;

export const TasksList = styled.ul`
  list-style: none;
`;

export const Task = styled.li`
  display: flex;
  padding: 10px 10px;
  border-bottom: 1px solid #f0f0f0;
  gap: 6px;
  cursor: ${(props) => (props.subtask_id ? 'default' : 'pointer')};

  &:hover {
    background-color: #fafafa;
    box-shadow: inset 0 0 0 1px rgb(31 96 194 / 40%);
    border-radius: 5px;
    cursor: ${(props) => (props.subtask_id ? 'default' : 'pointer')};
    box-shadow: ${(props) =>
      props.subtask_id ? 'none' : 'inset 0 0 0 1px rgb(31 96 194 / 40%)'};
    background-color: ${(props) => (props.subtask_id ? '#fff' : '#fafafa')};
  }
`;

export const ButtonWrapper = styled.div`
  min-width: 26px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  display: ${(props) => (props.isEditingMode ? `none` : 'flex')};
`;

export const TaskButton = styled.button`
  min-width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const TaskButtonOuter = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgb(${(props) => colors[props.color]});
  background: ${(props) =>
    props.completed
      ? `rgb(${colors[props.color]})`
      : `rgba(${colors[props.color]}, 0.1)`};

  &:hover {
    background: ${(props) =>
      props.completed
        ? `rgb(${colors[props.color]})`
        : `rgba(${colors[props.color]}, 0.2)`};

    & > * {
      display: flex;
    }
  }
`;

export const TaskButtonInner = styled.span`
  display: ${(props) => (props.completed ? 'flex' : 'none')};
  color: ${(props) =>
    props.completed ? '#fff' : `rgb(${colors[props.color]})`};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TaskContent = styled.div`
  flex-grow: 1;
`;

export const TaskLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

export const Subtask = styled.div``;

export const TaskTitle = styled.p`
  color: ${(props) => (props.completed ? `#808080` : '#202020')};
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  word-break: break-word;
  text-decoration: ${(props) => (props.completed ? `line-through` : 'none')};
`;

export const TaskDescription = styled.p`
  margin: 0;
  font-size: 12px;
  word-break: break-word;
  color: #808080;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #808080;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const BranchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const TaskProject = styled.span`
  color: grey;
`;

export const TaskActions = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 40px;
  align-self: center;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #e8e8e8;
    border-radius: 5px;
  }
`;

export const Message = styled.div`
  position: fixed;
  z-index: 3;
  background: #fff;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const StyledAside = styled.div`
  height: calc(100vh - 44px);
  width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  min-width: ${(props) => (props.isAsideVisible ? '300px' : '0')};
  background: #fafafa;
  padding: ${(props) =>
    props.isAsideVisible ? '30px 5px 0 35px' : '30px 5px 0 0 '};
  transform: ${(props) =>
    props.isAsideVisible ? 'translate(0)' : 'translate(-305px)'};
  transition: all 0.3s ease-in-out;
  z-index: 2;

  @media (max-width: 767px) {
    position: absolute;
    box-shadow: ${(props) =>
      props.isAsideVisible ? ' 0 2px 10px rgb(0 0 0 / 30%)' : 'none'};
  }
`;

export const Overlay = styled.div`
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${(props) => (props.isAsideVisible ? '1' : '0')};
    visibility: ${(props) => (props.isAsideVisible ? 'visible' : 'hidden')};
  }
`;

export const Navigation = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  ${listItemStyles}

  &:hover {
    button {
      display: flex;
    }

    .task-counter {
      display: none;
    }
  }
`;

export const ProjectToggle = styled.div`
  ${listItemStyles}

  &:hover {
    background: transparent;
  }
`;

export const ProjectContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 26px;
  align-items: center;
  font-weight: 700;
  line-height: 26px;
  color: #202020;
`;

export const AddProjectBtn = styled.button`
  ${projectBtnStyles}
  display: flex;

  &:hover {
    background: #eee;
  }
`;

export const Project = styled.div`
  display: inline-block;
  width: 100%;
  border: none;
  font-size: 14px;
  font-weight: normal;
  color: #333;
  line-height: 26px;
  padding: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
`;

export const ProjectColor = styled.span`
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.color};
  }
`;

export const ProjectDots = styled.button`
  ${projectBtnStyles}
`;

export const ListMenu = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  width: 200px;
  padding: 4px 0;
  background-color: #fff;
  color: #333;
  border-radius: 3px;
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);
  border: 1px solid #ddd;
`;

export const MenuItem = styled.div`
  font-weight: normal;
  font-size: 13px;
  padding: 4px 10px;
  display: grid;
  grid-template-columns: 24px 1fr;

  &:hover {
    background: #f3f3f3;
    color: #cc4643;
  }
`;

export const MenuItemDelete = styled.span`
  display: flex;
  align-items: center;
`;

export const TaskCouter = styled.span`
  font-size: 12px;
  font-weight: normal;
  color: #aaa;
  text-align: center;
`;
