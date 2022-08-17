import { renderHook } from '@testing-library/react-hooks';
import { act, render, screen } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Weather from 'src/components/Home/Weather';
import { weatherList } from '../recoil/todo';
import { Suspense } from 'react';
import { Repository } from 'src/recoil/repository';
describe('[Weather] Weather.tsx TEST', () => {
  it('- Weather 컴포넌트 렌더링 테스트', () => {
    render(
      <RecoilRoot>
        <Weather />
      </RecoilRoot>
    );
  });
  it('- 날씨 리스트의 상태값이 loading 인지', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRecoilValue(weatherList), {
      wrapper: () => (
        <RecoilRoot>
          <Suspense fallback="">
            <Weather />
          </Suspense>
        </RecoilRoot>
      )
    });
    await act(async () => await Repository.getWeatherList());
    console.log(result.current);
  });
});
