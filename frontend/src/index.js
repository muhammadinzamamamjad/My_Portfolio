import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or './App.css' if you put the Tailwind code there
import store from './redux/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css'; // Import Ant Design styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
