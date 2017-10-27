import React, { Component } from 'react';
import { connect } from 'react-redux';
import Time from 'react-time';
import { commentVote, deleteComment } from '../../../actions/comments_actions';
import PropTypes from 'prop-types';

class CommentWidget extends Component {
	static propTypes = {
		comment: PropTypes.object.isRequired,
		editComment: PropTypes.func.isRequired
	};
	handlevoteClick = option => {
		this.props.commentVote(this.props.comment.id, option);
	};
	onDeleteClick = () => {
		this.props.deleteComment(this.props.comment.id);
	};

	onEditClick = () => {
		this.props.editComment(this.props.comment.id);
	};
	render() {
		const comment = this.props.comment;

		return (
			<div className="card">
				{comment ? (
					<div className="card-block">
						<div className="card-body">
							<div className="row">
								<div className="col-md-2">
									<table>
										<tbody>
											<tr>
												<td>
													<i
														className="clickable fa fa-arrow-up fa"
														aria-hidden="true"
														onClick={e => this.handlevoteClick('upVote')}
													/>
												</td>
											</tr>

											<tr>
												<td
													align="center"
													valign="center"
													className="vote-score"
												>
													{comment.voteScore}
												</td>
											</tr>

											<tr>
												<td>
													<i
														className="clickable fa fa-arrow-down fa"
														aria-hidden="true"
														onClick={e => this.handlevoteClick('downVote')}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="col-md-10">
									<h2 className="card-title">{comment.author}</h2>
									<small>
										<Time value={comment.timestamp} format="YYYY/MM/DD" />
									</small>

									<p>{comment.body}</p>
								</div>
							</div>
							<div className="float-right">
								<i
									className="clickable card-link fa fa-pencil-square-o"
									aria-hidden="true"
									onClick={e => this.onEditClick()}
								/>

								<i
									className="clickable card-link fa fa-trash-o"
									aria-hidden="true"
									onClick={e => this.onDeleteClick()}
								/>
							</div>
						</div>
					</div>
				) : (
					<div>Loading...</div>
				)}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		commentVote: (id, option) => dispatch(commentVote(id, option)),
		deleteComment: id => dispatch(deleteComment(id))
	};
}

export default connect(null, mapDispatchToProps)(CommentWidget);
