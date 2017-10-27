import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import { fetchPosts, fetchCategories } from '../actions/posts_actions';
import PostWidget from './postsList_components/PostWidget';
import Sidebar from './postsList_components/Sidebar';

import Navbar from './shared_components/Navbar';
import Breadcrumb from './shared_components/Breadcrumb';

class PostsList extends Component {
	componentDidMount() {
		const selectedCategory = this.props.match.params
			? this.props.match.params.category
			: null;

		this.props.fetchPosts(selectedCategory);
		this.props.fetchCategories();
	}

	renderPosts = () => {
		if (this.props.posts.length === 0) {
			return <div className="list-group-item">No Post Found</div>;
		} else {
			return this.props.posts.map(post => {
				const postComments = this.props.comments.filter(comment => {
					return post.id === comment.parentId;
				});
				return (
					<li key={post.id}>
						<PostWidget post={post} postCommentsCount={postComments.length} />
					</li>
				);
			});
		}
	};
	componentWillReceiveProps(nextProps) {
		if (
			nextProps.match.params.category &&
			nextProps.location.pathname !== this.props.location.pathname
		) {
			nextProps.fetchPosts(nextProps.match.params.category);
		} else if (
			!nextProps.match.params.category &&
			nextProps.location.pathname !== this.props.location.pathname
		) {
			nextProps.fetchPosts(null);
		}
	}
	render() {
		return (
			<div>
				<Navbar />
				<div className="container app-body">
					<div className="row">
						{this.props.match.params.category ? (
							<Breadcrumb pagename={this.props.match.params.category} />
						) : (
							<Breadcrumb pagename={null} />
						)}
					</div>
					<div className="row">
						<div className="col-md-8">
							<ul>{this.renderPosts()}</ul>
						</div>
						<div className="col-md-4">
							<Sidebar />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: selectedcategory => dispatch(fetchPosts(selectedcategory)),
		fetchCategories: () => dispatch(fetchCategories())
	};
}
function mapStateToProps(state) {
	return {
		posts: state.posts,
		comments: state.comments
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
