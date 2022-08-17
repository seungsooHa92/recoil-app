import styled from 'styled-components';
import { AppSize } from './types';

export const AppWrap = styled.div<AppSize>`
  width: 100%;
  height: ${props => props.height}px;
  min-width: 375px;
  max-width: 640px;
`;
export const AppContentWrap = styled.div`
  width: 100%;
  height: 100%;
`;
export const HeaderWrap = styled.div`
  algin-items: center;
  padding-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
  .h1 {
    margin-bottom: 10px;
  }
`;
export const BodyWrap = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;
