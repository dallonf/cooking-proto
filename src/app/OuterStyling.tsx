import * as React from 'react';
import styled from 'styled-components';
import { LINE } from './colors';

const Fullscreen = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const AppWrapper = styled.div`
  width: 1366px;
  height: 720px;
  overflow: hidden;
  align-self: center;
`;

interface LetterboxBarProps { direction?: 'top' | 'bottom'; };
const LetterboxBar = styled.div`
  flex: 1;
  background: rgba(0,0,0,0.2);
  border-bottom: ${ (props: LetterboxBarProps) => props.direction === 'top' ? `2px ${LINE} solid` : 'none' }
  border-top: ${ (props: LetterboxBarProps) => props.direction === 'bottom' ? `2px ${LINE} solid` : 'none' }
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
