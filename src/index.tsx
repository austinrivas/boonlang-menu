import React from 'react';
import ReactDOM, { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
if (rootElement.hasChildNodes()) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  hydrateRoot(rootElement, 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
