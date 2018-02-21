import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index';
import { store } from './store/configStore';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
const application = (
	<Provider store={store}>
		<Router>
			<Route path="/" component={Index} />
		</Router>
	</Provider>
)

ReactDOM.render(application, document.getElementById('root'));
registerServiceWorker();
