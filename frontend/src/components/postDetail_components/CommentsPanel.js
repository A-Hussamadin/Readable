import React, { Component } from 'react';
import CommentWidget from './commentsPanel_components/CommentWidget';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

class CommentsPanel extends Component {
	static propTypes = {
		parentId: PropTypes.string.isRequired,
		editComment: PropTypes.func.isRequired
	};
	renderComments = () => {
		return this.props.comments.map(comment => {
			return (
				<div key={comment.id} className="col-md-12 comment-card">
					<CommentWidget
						comment={comment}
						editComment={this.props.editComment}
					/>
				</div>
			);
		});
	};
	render() {
		return (
			<div className="col-md-12 ">
				<ul>{this.renderComments()}</ul>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	//	conosle.log('state ', state);
	return {
		comments: _.filter(state.comments, ['parentId', ownProps.parentId])
	};
}

export default connect(mapStateToProps)(CommentsPanel);
