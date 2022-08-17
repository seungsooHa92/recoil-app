import { useRecoilValue } from 'recoil';
import { editState } from '../recoil/todo';
import { HeaderWrap } from 'src/globalStyles';

const AppHeader = () => {
  const editMode = useRecoilValue(editState);
  return (
    <HeaderWrap data-testid="header">
      {!editMode ? <h1>THIS WEEK</h1> : <h1>To-Do</h1>}
      {!editMode ? <h4>신나는 일주일을 계획합시다!</h4> : <></>}
    </HeaderWrap>
  );
};

export default AppHeader;
