import styled from 'styled-components';

export const StyledTaskSingle = styled.div`
  height: calc(100vh - 44px);
  overflow-y: auto;
  width: 100%;
  padding: 30px;
  padding-bottom: 84px;
`;

export const ProjectColorWrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProjectColor = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: ${(props) => props.color};
  border-radius: 50%;
`;

export const Project = styled.div`
  font-size: 14px;
  color: #202020;
`;

export const FlexLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Task = styled.div`
  margin-top: 5px;
  border-radius: 5px;
  cursor: text;
  padding: ${(props) => (props.isEditingMode ? `5px 10px 0` : '5px 0 0 0 ')};
  border: ${(props) =>
    props.isEditingMode ? `1px solid #ddd` : '1px solid transparent'};
`;

export const TaskTitle = styled.div`
  width: 100%;
  font-size: ${(props) => (props.isEditingMode ? `14px` : '16px')};
  line-height: 26px;
  font-weight: 700;
  outline: none;
  text-decoration: ${(props) => (props.completed ? `line-through` : 'none')};
  color: ${(props) => (props.completed ? `#808080` : '#202020')};
`;

export const TaskDescription = styled.div`
  padding-left: ${(props) => (props.isEditingMode ? `0` : '32px')};
  margin-bottom: 16px;
  outline: none;
  color: ${(props) => (props.completed ? `rgba(0,0,0,.4)` : '#202020')};
  word-break: break-word;
`;

export const TaskDetails = styled.div``;

export const ButtonsList = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Button = styled.button`
  width: 33.3%;
  display: block;
  padding: 10px 0;
  line-height: ${(props) => (props.tabSelected ? `1em` : '1.7')};
  /* font-size: ${(props) => (props.tabSelected ? `13px` : '0.875rem')}; */
  font-size: 13px;
  color: ${(props) => (props.tabSelected ? `#202020` : '#b3b3b3')};
  font-weight: ${(props) => (props.tabSelected ? `700` : '400')};
  text-decoration: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  border-bottom: ${(props) =>
    props.tabSelected ? `1px solid #202020` : '1px solid #ddd'};
  transition: all 0.2s;
`;

export const AddedOn = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 12px 20px;
  font-weight: 700;
`;

export const FormButtonWrapper = styled.div`
  display: ${(props) => (props.isEditingMode ? `grid` : 'none')};
  grid-template-columns: 100px 100px 1fr;
  grid-gap: 10px;
  padding: 10px 0;
`;

export const TabsComponent = styled.div``;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 22px;
`;

export const CommentsList = styled.ul`
  width: 100%;
  list-style: none;
`;

export const Comment = styled.li`
  padding: 10px 16px;
  position: relative;

  &:hover {
    button {
      display: flex;
    }
  }
`;

export const CommentUser = styled.span`
  font-weight: 700;
  margin-right: 8px;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #808080;
`;

export const CommentContent = styled.div`
  padding-top: 8px;
  line-height: 1.5;
`;

export const WriteComment = styled.div`
  width: 100%;
  margin-top: 32px;
  padding: 8px 16px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const CommentDelete = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 16px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const AttachmentBtn = styled.label`
  width: 34px;
  height: 34px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

export const StyledParagraph = styled.p`
  max-width: 250px;
  padding-top: 20px;
  font-size: 14px;
  color: #777;
  text-align: center;
`;

export const SubtasksList = styled.div`
  padding: 0 22px;
`;

export const Input = styled.textarea`
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  color: #808080;
  font-size: ${(props) => (props.primary ? '14px' : '13px')};
  font-weight: ${(props) => (props.primary ? '500' : '300')};
  height: ${(props) => (props.primary ? '25px' : '60px')};
  margin: ${(props) => (props.primary ? '0' : '4px 0')};

  &::placeholder {
    color: #aaa;
  }
`;
