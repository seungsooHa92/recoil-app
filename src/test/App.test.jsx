import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { RecoilRoot } from 'recoil';

describe('[App] App.tsx TEST', () => {
  it('- App 컴포넌트 렌더링 테스트', () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
  });
});
