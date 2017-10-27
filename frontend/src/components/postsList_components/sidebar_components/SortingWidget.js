import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortPosts } from '../../../actions/posts_actions';

class SortingWidget extends Component {
	onChange = event => {
		console.log(event.target.value);
		if (event.target.value !== undefined);
		this.props.sortPosts(event.target.value);
	};
	render() {
		return (
			<div className="card">
				<div className="card-block">
					<h4 className="card-title">Sorting</h4>
					<div className="card-text">
						<div className="card-body">
							<select className="col-md-12" onChange={this.onChange}>
								<option key="default" disabled={true}>
									-- Select Sorting Type --
								</option>
								<option value="score_high">Sort By highest VoteScore</option>
								<option value="score_low"> Sorty By lowest VotesScore</option>
								<option value="date_new">Sort By latest Posts</option>
								<option value="date_old">Sort By oldest Posts</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		sortPosts: sortType => dispatch(sortPosts(sortType))
	};
}

export default connect(null, mapDispatchToProps)(SortingWidget);
