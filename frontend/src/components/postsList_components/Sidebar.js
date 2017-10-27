import React from 'react';
import SortingWidget from './sidebar_components/SortingWidget';
import CategoriesWidget from './sidebar_components/CategoriesWidget';
const Sidebar = props => {
	return (
		<div className="col-md-12">
			<div className="mb-5">
				<SortingWidget />
			</div>
			<div className="mb-5">
				<CategoriesWidget />
			</div>
		</div>
	);
};

export default Sidebar;
