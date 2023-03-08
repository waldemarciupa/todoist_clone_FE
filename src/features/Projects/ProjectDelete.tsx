import { useDispatch } from 'react-redux';
import { deleteProject } from './projectsSlice';
import ProjectModal from './ProjectModal';

interface ProjectDeleteProps {
  id: string;
  name: string;
  hideModal: () => void;
  filterHandler: () => void;
}

const ProjectDelete = ({
  id,
  name,
  hideModal,
  filterHandler,
}: ProjectDeleteProps) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(deleteProject({ id }));
    hideModal();
    filterHandler();
  };

  return (
    <ProjectModal
      onClick={hideModal}
      title={'Delete'}
      handleSubmit={handleSubmit}
      hideProjectModal={hideModal}
    >
      <div>
        Are you sure you want to delete <b>{name}</b>?
      </div>
    </ProjectModal>
  );
};

export default ProjectDelete;
