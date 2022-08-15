import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from 'src/context/RootStoreProvider';
import styled from 'styled-components';

const Weather = observer(() => {
  const { todoStore } = useStores();
  //console.log('현재 todoStore에 있는 todo List :', todoStore._todoList);
  // console.log('클릭해서 보고있는 todo:', todoStore.viewingTodo);
  return (
    <WeatherWrap>
      <h3>이번주 날씨</h3>
      {/* {todoStore._todoList.map(todo => (
        <ul key={todo.id}>{todo.title}</ul>
      ))} */}
    </WeatherWrap>
  );
});
const WeatherWrap = styled.div`
  background: yellow;
  height: 250px;
`;
export default Weather;
