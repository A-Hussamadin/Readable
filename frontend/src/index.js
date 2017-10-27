import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/post/edit/:id" component={PostForm} />
					<Route path="/post/add" component={PostForm} />
					<Route path="/post/:id" component={PostDetail} />
					<Route path="/:category" component={PostsList} />
					<Route path="/" component={PostsList} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,

	document.getElementById('root')
);
registerServiceWorker();
