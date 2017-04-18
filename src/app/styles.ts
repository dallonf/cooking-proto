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