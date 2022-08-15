import React from 'react';
import styled from 'styled-components';

interface AppSize {
  width: number;
  height: number;
}

const App: React.FC = () => {
  const { innerHeight: height, innerWidth: width } = window;
  console.log(height, width);
  return (
    <AppWrap width={width} height={height}>
      ss
    </AppWrap>
  );
};

const AppWrap = styled.div<AppSize>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: beige;
`;

export default App;
