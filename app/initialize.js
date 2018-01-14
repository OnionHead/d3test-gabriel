import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Counter from './components/counter';
import Home from './components/home';
import Register from './components/register';
import * as SDKInitializer from './libs/SDKInitializer';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const App = () =>
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Register />
	</Provider>;

ReactDOM.render(<App />, document.querySelector('#app'));

//SDKInitializer.initSDKs();