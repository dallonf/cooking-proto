import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import OuterStyling from './app/OuterStyling';
import './index.css';

ReactDOM.render(
  <OuterStyling><App /></OuterStyling>,
  document.getElementById('root') as HTMLElement
);
