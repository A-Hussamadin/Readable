import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = props => {
	return (
		<div className="col-md-12">
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link to="/">All Posts</Link>
				</li>
				{props.pagename ? (
					<li className="breadcrumb-item active">{props.pagename}</li>
				) : null}
			</ol>
		</div>
	);
};

export default Breadcrumb;
