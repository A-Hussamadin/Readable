import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDetails, deletePost, postVote } from '../actions/posts_actions';

import { Link } from 'react-router-dom';
import Time from 'react-time';
import _ from 'lodash';

import Modal from 'react-modal';

import CommentsPanel from './postDetail_components/CommentsPanel';
import CommentForm from './postDetail_components/CommentForm';

import Navbar from './shared_components/Navbar';
import Breadcrumb from './shared_components/Breadcrumb';

class PostDetails extends Component {
	state = {
		modalOpen: false,
		commentToEdit: null,
		postId: null
	};

	openModal = () => {
		this.setState(() => ({
			modalOpen: true
		}));
	};
	closeModal = () => {
		this.setState(() => ({
			modalOpen: false,
			commentToEdit: null
		}));
	};

	componentDidMount() {
		const id = this.props.match.params.id;
		if (id) {
			this.props.postDetails(id);
			this.setState(() => ({
				postId: id
			}));
			//this.props.postComments(id);
		}
	}

	handlevoteClick = option => {
		this.props.postVote(this.props.post.id, option);
	};

	onDeleteClick = () => {
		this.props.deletePost(this.props.post.id);
		this.props.history.push('/');
	};

	openEditModal = commentId => {
		this.setState(() => ({
			modalOpen: true,
			commentToEdit: commentId
		}));
	};
	render() {
		if (this.props.post) {
			const modalOpen = this.state.modalOpen;
			const post = this.props.post;
			const comments = this.props.comments;

			return (
				<div>
					<Navbar />
					<div className="container app-body">
						<div className="row">
							<Breadcrumb pagename={'Post Details'} />
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="post-panel">
									<div className="card text-center">
										<div className="card-header">
											<span>
												<strong>VoteScore {post.voteScore}</strong>
											</span>
											<i
												className="clickable post-votedown-icon fa fa-arrow-down fa float-right"
												aria-hidden="true"
												onClick={e => this.handlevoteClick('downVote')}
											/>
											<i
												className="clickable post-voteup-icon fa fa-arrow-up fa float-right mr-2"
												aria-hidden="true"
												onClick={e => this.handlevoteClick('upVote')}
											/>
										</div>
										<div className="panel-header">
											<h1 className="mt-5 ml-4 card-title">{post.title}</h1>
										</div>
										<div>
											<p className="lead my-4 ml-4 card-subtitle post-subtitle">
												Posted at
												<span className="mx-2">
													<Time value={post.timestamp} format="YYYY/MM/DD" />
												</span>
												by
												<span className="ml-2">{post.author}</span>
											</p>
										</div>
										<hr />
										<div className="card-body">
											<p className="lead mt-5 mb-8 ml-4 post-body-text">
												{post.body}
											</p>
											<div className="float-left">
												<button
													className="btn btn-primary btn-large float-right"
													onClick={this.openModal}
												>
													Add Comment
												</button>
											</div>
											<div className="float-right">
												<span className="mr-2">category</span>
												<Link className="card-link" to={`/${post.category}`}>
													{post.category}
												</Link>
											</div>
										</div>
										<div className="card-footer ">
											<div className="float-left">
												<i className="fa fa-comment-o" aria-hidden="true">
													<span className="ml-2">{comments.length}</span>
												</i>
											</div>

											<div className="float-right">
												<Link
													className="card-link"
													to={`/post/edit/${post.id}`}
												>
													<i
														className="clickable mr-2 fa fa-pencil-square-o"
														aria-hidden="true"
													/>
													Edit
												</Link>

												<i
													className="clickable card-link fa fa-trash-o"
													aria-hidden="true"
													onClick={e => this.onDeleteClick()}
												>
													<span className="ml-2">Delete</span>
												</i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row comments-panel">
							<CommentsPanel
								parentId={this.state.postId}
								editComment={this.openEditModal}
							/>
						</div>
						<div className="col-md-12">
							<Modal
								className="modal-container "
								overlayClassName="overlay"
								isOpen={modalOpen}
								onRequestClose={this.closeModal}
								contentLabel="Modal"
							>
								<div className="card-form">
									<CommentForm
										parentId={this.state.postId}
										commentId={this.state.commentToEdit}
										close={this.closeModal}
									/>
								</div>
							</Modal>
						</div>
					</div>
				</div>
			);
		} else {
			return <div>Loading...</div>;
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		postDetails: id => dispatch(postDetails(id)),
		postVote: (id, option) => dispatch(postVote(id, option)),
		deletePost: id => dispatch(deletePost(id))
	};
}
function mapStateToProps(state, ownProps) {
	return {
		post: state.posts[0],
		comments: _.filter(state.comments, ['parentId', ownProps.match.params.id])
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
