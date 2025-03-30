import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store';
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);

