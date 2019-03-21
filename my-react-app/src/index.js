import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/base.less';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

// ReactDOM.render(<Index />, document.getElementById('root'));
render(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
