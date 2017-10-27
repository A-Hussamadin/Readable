import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class CategoriesWidget extends Component {
	renderCategories = () => {
		return this.props.categories.map(category => {
			return (
				<li className="list-group-item" key={category.name}>
					<Link to={`/${category.name}`}>{category.name}</Link>
				</li>
			);
		});
	};
	render() {
		return (
			<div className="card">
				<h5 className="card-header left-panel-card-heading">Categories</h5>
				<div className="card-body">
					<ul className="list-unstyled mb-0">{this.renderCategories()}</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories
	};
}

export default connect(mapStateToProps)(CategoriesWidget);
