import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-primary justify-content-between fixed-top nav-custome">
			<Link to="/" className="navbar-brand">
				<i className="fa fa-home" aria-hidden="true">
					<span className="ml-2">Home</span>
				</i>
			</Link>
			<div className="mr-sm-2">
				<ul className=" float-right ">
					<li className="nav-item">
						<Link to="/post/add" className="navbar-brand btn btn-dark">
							Add Post
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
