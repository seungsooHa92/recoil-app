import { renderHook } from '@testing-library/react-hooks';
import AppHeader from '../components/AppHeader';
import { render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { editState } from '../recoil/todo';

describe('[AppHeader] AppHeader.tsx TEST', () => {
  test('- AppHeader 컴포넌트 렌더링 테스트', () => {
    render(
      <RecoilRoot>
        <AppHeader />
      </RecoilRoot>
    );
  });
  test('- THIS Week 글자가 포함되었는지', () => {
    render(
      <RecoilRoot>
        <AppHeader />
      </RecoilRoot>
    );
    const thisWeek = screen.getByText(/THIS WEEK/);
    expect(thisWeek).toBeInTheDocument();
  });
  test('- 편집 모드가 false값으로 초기화 되었는지', () => {
    const { result } = renderHook(() => useRecoilValue(editState), {
      wrapper: RecoilRoot
    });
    expect(result.current).toEqual(false);
  });
  test('- 편집 모드가 false값일때', () => {
    render(
      <RecoilRoot>
        <AppHeader />
      </RecoilRoot>
    );

    const fun = screen.getByText(/신나는 일주일을 계획합시다/);
    expect(fun).toBeInTheDocument();
  });
});
