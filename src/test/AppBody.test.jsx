import { renderHook } from '@testing-library/react-hooks';
import AppHeader from '../components/AppHeader';
import { render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { editState } from '../recoil/todo';
import AppBody from '../components/AppBody';

describe('[AppBody] AppBody.tsx TEST', () => {
  test('- AppBody 컴포넌트 렌더링 테스트', () => {
    render(
      <RecoilRoot>
        <AppBody />
      </RecoilRoot>
    );
  });
});
