import { SetStateAction, useState } from 'react';
import { addNewProject } from './projectsSlice';
import styled, { css } from 'styled-components';
import { ProjectColorList } from './ProjectColorList';
import ProjectModal from './ProjectModal';
import { useAppDispatch } from '../../app/hooks';

const styles = css`
  width: 100%;
  height: 28px;
  padding: 0;
  background: transparent;
  color: #202020;
  cursor: pointer;
  display: grid;
  grid-template-columns: 28px 1fr;
  text-align: left;
  align-items: center;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 5px;
`;

const ButtonColor = styled.button`
  ${styles}

  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ColoredDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
  margin: 0 auto;
`;

interface ColorListProps {
  isOpen: boolean;
}

const ColorList = styled.ul<ColorListProps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  height: 300px;
  width: 352px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  outline: none;
  background: #fff;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
`;

const Color = styled.li`
  ${styles}

  &:hover {
    background: #f3f3f3;
  }
`;

interface ProjectCreateProps {
  hideProjectModal: () => void;
}

const ProjectCreate = ({ hideProjectModal }: ProjectCreateProps) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState<string | undefined>('Charcoal');
  const [color, setColor] = useState<string | undefined>('rgb(128, 128, 128)');
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(addNewProject({ name, title, color }));
    hideProjectModal();
  };

  return (
    <ProjectModal
      onClick={hideProjectModal}
      title={'Add project'}
      handleSubmit={handleSubmit}
      hideProjectModal={hideProjectModal}
    >
      <FormField>
        <Label>Name</Label>
        <Input required value={name} onChange={handleChange} />
      </FormField>
      <FormField>
        <Label>Color</Label>
        <ButtonColor
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          <ColoredDot color={color}></ColoredDot>
          <span>{title}</span>
        </ButtonColor>
        <ColorList isOpen={isOpen}>
          {ProjectColorList.map((el) => {
            return (
              <Color
                data-color={el.color}
                data-title={el.title}
                onClick={(e) => {
                  setTitle(e.currentTarget.dataset.title);
                  setColor(e.currentTarget.dataset.color);
                  setIsOpen(false);
                }}
                key={el.title}
              >
                <ColoredDot color={el.color}></ColoredDot>
                <span>{el.title}</span>
              </Color>
            );
          })}
        </ColorList>
      </FormField>
    </ProjectModal>
  );
};

export default ProjectCreate;
