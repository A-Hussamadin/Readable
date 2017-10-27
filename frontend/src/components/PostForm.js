import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import {
	fetchCategories,
	createPost,
	postDetails,
	editPost,
	postVote,
	deletePost
} from '../actions/posts_actions';
import { GenerateUniqueID } from '../utils/helpers';

import Navbar from './shared_components/Navbar';
import Breadcrumb from './shared_components/Breadcrumb';

class PostForm extends Component {
	componentDidMount() {
		if (this.props.match.url === '/post/edit') {
			this.props.postDetails(this.props.match.params.id);
		}
		this.props.fetchCategories();
	}

	handlevoteClick = option => {
		this.props.postVote(this.props.match.params.id, option);
	};

	onDeleteClick = () => {
		this.props.deletePost(this.props.match.params.id);
		this.props.history.push('/');
	};

	renderField = field => {
		//console.log(field);
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" {...field.input} />
				<div className="form-control-feedback">{touched ? error : ''}</div>
			</div>
		);
	};

	renderTextArea = field => {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<textarea className="form-control" {...field.input} />
				<div className="form-control-feedback">{touched ? error : ''}</div>
			</div>
		);
	};

	renderVoteField = field => {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<div className="row">
					<i
						className="clickable post-votedown-icon fa fa-arrow-down fa float-right"
						aria-hidden="true"
						onClick={e => this.handlevoteClick('downVote')}
					/>

					<input className="form-control col-md-2" {...field.input} disabled />

					<i
						className="clickable post-voteup-icon fa fa-arrow-up fa float-right mr-2"
						aria-hidden="true"
						onClick={e => this.handlevoteClick('upVote')}
					/>
				</div>
				<div className="form-control-feedback">{touched ? error : ''}</div>
			</div>
		);
	};
	renderSelect = field => {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<select className="form-control" {...field.input}>
					<option />
					{this.props.categories.map(category => {
						return (
							<option key={category.name} value={category.name}>
								{category.name}
							</option>
						);
					})}
				</select>
				<div className="form-control-feedback">{touched ? error : ''}</div>
			</div>
		);
	};
	onSubmit(values) {
		if (this.props.match.params.id) {
			this.props.editPost(values);
		} else {
			const uiud = GenerateUniqueID(10);
			const timestamp = Date.now();

			values.id = uiud;
			values.timestamp = timestamp;

			this.props.createPost(values);
		}

		this.props.history.push('/');
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<Navbar />
				<div className="container app-body">
					<div className="row">
						{this.props.match.url !== '/post/add' ? (
							<Breadcrumb pagename={'Edit Post'} />
						) : (
							<Breadcrumb pagename={'Add Post'} />
						)}
					</div>
					<div className="row">
						<div className="col-md-8 ml-auto mr-auto card">
							{
								<div className="card-header">
									<h3 className="card-title">Post Form</h3>
								</div>
							}
							<div className="card-body">
								<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
									<Field
										label="Post Title"
										name="title"
										component={this.renderField}
									/>
									<Field
										label="Post Body"
										name="body"
										component={this.renderTextArea}
									/>
									<Field
										label="Post author"
										name="author"
										component={this.renderField}
									/>
									<Field
										label="Post Category"
										name="category"
										component={this.renderSelect}
									/>
									{this.props.match.params.id ? (
										<Field
											label="Post VoteScore"
											name="voteScore"
											component={this.renderVoteField}
										/>
									) : (
										''
									)}

									<button type="submit" className="btn btn-primary">
										Sbumit
									</button>
									<Link to="/" className="btn btn-danger">
										Cancel
									</Link>

									<button
										type="button"
										className="btn btn-danger float-right"
										onClick={e => this.onDeleteClick()}
									>
										{this.props.match.params.id ? (
											<i
												className="clickable card-link fa fa-trash-o"
												aria-hidden="true"
											>
												<span className="ml-2">Delete</span>
											</i>
										) : (
											''
										)}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title';
	}

	if (values.title && values.title.length < 3) {
		errors.title = 'Title must be at least 3 Characters';
	}

	if (!values.author) {
		errors.author = 'Enter author name';
	}

	if (!values.category) {
		errors.category = 'Please select a Category';
	}

	if (!values.body) {
		errors.body = 'Enter post content';
	}
	//if errors is empty the form is OK to submit
	return errors;
}

function mapDispatchToProps(dispatch) {
	return {
		createPost: values => dispatch(createPost(values)),
		fetchCategories: () => dispatch(fetchCategories()),
		postDetails: id => dispatch(postDetails(id)),
		editPost: values => dispatch(editPost(values)),
		postVote: (id, option) => dispatch(postVote(id, option)),
		deletePost: id => dispatch(deletePost(id))
	};
}

function mapStateToProps(state, ownProps) {
	let propState;
	if (ownProps.match.params.id) {
		propState = {
			initialValues: state.posts[0],
			categories: state.categories
		};
	} else {
		propState = {
			categories: state.categories
		};
	}
	return propState;
}

let InitializeFromStateForm = reduxForm({
	validate: validate,
	form: 'PostForm',
	enableReinitialize: true
})(PostForm);

InitializeFromStateForm = connect(mapStateToProps, mapDispatchToProps)(
	InitializeFromStateForm
);

export default InitializeFromStateForm;
