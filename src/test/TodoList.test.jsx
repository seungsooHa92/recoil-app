import { renderHook } from '@testing-library/react-hooks';
import { act, render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import TodoList from '../components/Home/TodoList';
describe('[TodoList] TodoList.tsx TEST', () => {
  it('- TodoList 컴포넌트 렌더링 테스트', () => {
    render(
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    );
  });
});
