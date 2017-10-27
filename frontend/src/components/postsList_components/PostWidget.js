import React, { Component } from 'react';
import Time from 'react-time';
import { postVote, deletePost } from '../../actions/posts_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class PostWidget extends Component {
	componentDidMount() {
		//	this.props.postComments(this.props.post.id);
	}

	handlevoteClick = option => {
		this.props.postVote(this.props.post.id, option);
	};

	onDeleteClick = () => {
		this.props.deletePost(this.props.post.id);
	};

	handleEditeClick = () => {
		this.props.onEditClic(this.props.post.id);
	};

	render() {
		const post = this.props.post;
		const commentsCount = this.props.postCommentsCount;
		return (
			<div className="card col-md-12 main-panel-card">
				{post ? (
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
													{post.voteScore}
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
									<Link to={`/post/${post.id}`}>
										<h2 className="card-title">{post.title}</h2>
									</Link>
									<h6 className="card-subtitle">
										Submited on
										<Time value={post.timestamp} format="YYYY/MM/DD" /> by
										<strong>{post.author}</strong>
									</h6>

									<span className="comment-text">{commentsCount} Comments</span>
									<div className="float-right">
										<Link className="card-link" to={`/post/edit/${post.id}`}>
											<i
												className="clickable fa fa-pencil-square-o"
												aria-hidden="true"
											/>
										</Link>
										<i
											className="clickable card-link fa fa-trash-o"
											aria-hidden="true"
											onClick={e => this.onDeleteClick()}
										/>
									</div>
								</div>
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
		postVote: (id, option) => dispatch(postVote(id, option)),
		deletePost: id => dispatch(deletePost(id))
	};
}

export default connect(null, mapDispatchToProps)(PostWidget);
