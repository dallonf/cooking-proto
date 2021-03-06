import styled from 'styled-components';

export const LINE_COLOR = 'rgba(255,255,255,0.4)';
export const PANEL_BG_COLOR = 'rgba(0,0,0,0.6)';
export const PANEL_OUTLINE_SHADOW = `
  0 0 0 1px ${LINE_COLOR}, 0 0 1px 2px ${PANEL_BG_COLOR}
`;
export const PANEL_HIGHLIGHT_SHADOW = `
  0 0 0 1px white,
  0 0 4px 2px rgba(255,255,255,0.6), 0 0 4px 0 rgba(255,255,255,0.6) inset,
  0 0 10px 4px rgba(255,255,255,0.4)
`;
export const TRANSITION = `
  transition: all 250ms ease-out;
`;

export const Header = styled.h2`
  text-align: center;
  font-weight: normal;
  font-size: 16px;
  margin: 0;
  margin-top: 18px;
`;

export const Button = styled.button`
  background: ${PANEL_BG_COLOR};
  border: none;
  box-shadow: ${PANEL_OUTLINE_SHADOW};
  font-size: 20px;
  height: 60px;
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: italic;
  cursor: pointer;
  ${TRANSITION}

  &:first-child {
    margin-right: 8px;
  }

  &:hover, &:focus {
    box-shadow: ${PANEL_HIGHLIGHT_SHADOW};
  }
  &:active {
    background: rgba(255,255,255,0.8);
  }
`;