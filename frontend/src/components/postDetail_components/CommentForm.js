import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
	createComment,
	editComment,
	commentVote,
	deleteComment
} from '../../actions/comments_actions';
import { GenerateUniqueID } from '../../utils/helpers';
import _ from 'lodash';
import PropTypes from 'prop-types';

class CommentForm extends Component {
	static propTypes = {
		close: PropTypes.func.isRequired
	};
	renderField = field => {
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
	handlevoteClick = option => {
		this.props.commentVote(this.props.commentId, option);
	};

	onDeleteClick = () => {
		this.props.deleteComment(this.props.commentId);
		this.props.close();
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
						className="clickable ml-2 post-votedown-icon fa fa-arrow-down fa float-right"
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
	onSubmit(values) {
		if (this.props.commentId !== null) {
			this.props.editComment(values);
		} else {
			const uiud = GenerateUniqueID(10);
			const timestamp = Date.now();
			values.id = uiud;
			values.timestamp = timestamp;
			values.parentId = this.props.parentId;
			this.props.createComment(values);
		}

		//	this.props.history.push(`/post/${this.comment.parentId}`);
		this.props.close();
	}

	handleCancelClick = () => {
		this.props.close();
	};
	render() {
		const { handleSubmit } = this.props;
		//	console.log(this.props.commentId);
		return (
			<div className="col-md-12">
				<div>
					<h2 className="my-5">
						{this.props.comment !== null ? 'Edit Comment' : 'Add Comment'}
					</h2>
				</div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						label="Comment Author"
						name="author"
						component={this.renderField}
					/>
					<Field
						label="Comment Body"
						name="body"
						component={this.renderTextArea}
					/>

					{this.props.commentId !== null ? (
						<Field
							label="Comment VoteScore"
							name="voteScore"
							component={this.renderVoteField}
						/>
					) : (
						''
					)}
					<div className="mt-5">
						<button type="submit" className="btn btn-primary">
							Sbumit
						</button>
						<button
							type="button"
							onClick={this.handleCancelClick}
							className="btn btn-danger"
						>
							Cancel
						</button>

						<button
							type="button"
							className="btn btn-danger float-right"
							onClick={e => this.onDeleteClick()}
						>
							{this.props.commentId !== null ? (
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
					</div>
				</form>
			</div>
		);
	}
}
function validate(values) {
	const errors = {};

	if (!values.author) {
		errors.author = 'Enter author name';
	}

	if (!values.body) {
		errors.body = 'Enter post content';
	}
	//if errors is empty the form is OK to submit
	return errors;
}

function mapDispatchToProps(dispatch) {
	return {
		createComment: values => dispatch(createComment(values)),
		editComment: values => dispatch(editComment(values)),
		commentVote: (id, option) => dispatch(commentVote(id, option)),
		deleteComment: id => dispatch(deleteComment(id))
	};
}

function mapStateToProps(state, ownProps) {
	let propState = {};
	if (ownProps.commentId !== null) {
		const comment = _.find(state.comments, {
			id: ownProps.commentId
		});

		propState = {
			initialValues: comment
		};
	}
	return propState;
}

let InitializeFromStateForm = reduxForm({
	validate: validate,
	form: 'PostForm',
	enableReinitialize: true
})(CommentForm);

InitializeFromStateForm = connect(mapStateToProps, mapDispatchToProps)(
	InitializeFromStateForm
);

export default InitializeFromStateForm;
