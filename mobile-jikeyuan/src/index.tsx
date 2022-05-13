import './index.scss';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '@/store';

import App from './pages/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
