import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../context/RootStoreProvider';

const AppHeader = observer(() => {
  const { uiStore } = useStores();
  return (
    <HeaderWrap>
      <h1>THIS WEEK</h1>
      {uiStore.editMode ? <h3>신나는 일주일을 계획합시다!</h3> : <>에딧모드 아닐때</>}
    </HeaderWrap>
  );
});
const HeaderWrap = styled.div`
  algin-items: center;
  background: lightgreen;
  padding-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
`;
export default AppHeader;
