import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  background: #db4c3f;
  padding: 0 42px;
  color: #fff;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 540px) {
    padding: 0 12px;
  }
`;

export const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledButton = styled.button`
  position: ${(props) => (props.search ? 'absolute' : 'initial')};
  height: 28px;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: hsla(0, 0%, 100%, 0.2);
  }
`;

export const SearchBar = styled.form`
  height: 28px;
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: 3px;
  color: #fff;
  position: relative;

  @media (max-width: 540px) {
    display: none;
  }
`;

export const Search = styled.input`
  background: transparent;
  border: 0;
  margin-left: 25px;
  padding-left: 4px;
  height: 100%;
  color: #fff;

  &:focus {
    background: #fff;
    color: #202020;
    width: 380px;
    outline: none;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

    &::placeholder {
      color: #202020;
    }

    & + button {
      display: flex;
    }

    & + div {
      display: block;
    }
  }

  &::placeholder {
    color: #fff;
  }
`;

export const SearchClose = styled.button`
  position: absolute;
  top: 55%;
  right: 7px;
  transform: translateY(-50%);
  display: none;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border: none;
  padding: 1px;
  border-radius: 3px;
  background: transparent;
  color: #202020;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

export const SearchBox = styled.div`
  position: absolute;
  top: 32px;
  width: 406px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  background: #fff;
  color: #333;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0 0 8px rgb(0 0 0 / 5%), 0 10px 10px -5px rgb(0 0 0 / 5%),
    0 20px 25px -5px rgb(0 0 0 / 10%);
  z-index: 3;
`;

export const TaskLink = styled(Link)`
  display: block;
  font-size: 13px;
  color: #202020;
  text-decoration: none;
  padding: 10px;
  /* display: flex;
  justify-content: space-between; */

  & span {
    font-size: 12px;
    color: #808080;
  }

  &:hover {
    background: #eee;
  }
`;

export const TaskLinkBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Description = styled.span`
  padding-right: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Project = styled.span`
  min-width: 50px;
  text-align: right;
`;

export const EmptySearch = styled.p`
  padding-left: 10px;
`;
