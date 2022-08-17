import { act } from '@testing-library/react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { renderHook } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';

// node -> atom, selector
// onChange -> 상태가 변경될때마다 호출
export const RecoilObserver = ({ node, onChange }) => {
  const value = useRecoilValue(node);
  useEffect(() => {
    onChange(value);
  }, [onChange, value]);
  return null;
};

/*
비동기 atom , selector 사용시
컴포넌트의 context가 중단되는데 이를 방지하기위한
헬퍼 함수
*/
export const flushPromisesAndTimers = () => {
  return act(
    () =>
      new Promise(resolve => {
        setTimeout(resolve, 100);
        jest.runAllTimers();
      })
  );
};
