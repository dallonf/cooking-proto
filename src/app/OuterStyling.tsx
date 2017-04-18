import * as React from 'react';
import styled from 'styled-components';
import { LINE_COLOR } from './styles';

const Fullscreen = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const AppWrapper = styled.div`
  width: ${1366 + 16}px;
  height: 720px;
  padding: 0 8px;
  overflow: hidden;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
`;

interface LetterboxBarProps { direction?: 'top' | 'bottom'; };
const LetterboxBar = styled.div`
  flex: 1;
  background: rgba(0,0,0,0.2);
  border-bottom: ${ (props: LetterboxBarProps) => props.direction === 'top' ? `2px ${LINE_COLOR} solid` : 'none' }
  border-top: ${ (props: LetterboxBarProps) => props.direction === 'bottom' ? `2px ${LINE_COLOR} solid` : 'none' }
`;

const OuterStyling = ({ children }:{ children?: React.ReactNode }) => (
  <Fullscreen>
    <LetterboxBar direction="top" />
    <AppWrapper>
      {children}
    </AppWrapper>
    <LetterboxBar direction="bottom" />
  </Fullscreen>
);
export default OuterStyling;
