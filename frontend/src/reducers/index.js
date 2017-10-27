import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer';
import CommentsReducer from './CommentsReducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	posts: PostsReducer,
	categories: CategoriesReducer,
	comments: CommentsReducer,
	router: routerReducer,
	form: formReducer
});

export default rootReducer;
