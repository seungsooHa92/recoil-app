import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { editState } from '../recoil/todo';

const AppHeader = () => {
  const editMode = useRecoilValue(editState);
  return (
    <HeaderWrap data-testid="header">
      <h1>THIS WEEK</h1>
      {!editMode ? <h4>신나는 일주일을 계획합시다!</h4> : <></>}
    </HeaderWrap>
  );
};
const HeaderWrap = styled.div`
  algin-items: center;
  padding-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
  .h1 {
    margin-bottom: 10px;
  }
`;
export default AppHeader;
