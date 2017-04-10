/* mocksite.js

This file provides the code that generates a "mock" site to be displayed
under the announcement. Because this project merely lets the user create
an announcement, the mocksite provides the context for what the rest of
a website created using GoCentral may look like.

*/

import React from 'react';
import './css/mocksite.css';

class MockSite extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

	}

	render () {
		var mockSite = (
			<div className="mocksite">
				<div className="mockheader"> 
					<div className="mocknav">
						<div className="col-1 mocknavtitle">Mr. Dough's Donuts</div>
						<div className="col-1">Home&nbsp;&nbsp;&nbsp;&nbsp;Shop&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Cart</div>
					</div>
					<h1 className="mocktitle">MR. DOUGH'S DOUGHNUTS</h1>
					<h4 className="mockphone">1-800-DOU-NUTS</h4>
				</div>

				<div className="mockabout"> 
					<h3>ABOUT US</h3>
					<hr/>
					<p>Mr. Dough's doughnuts is a local doughnut establishment run by Mr. Dough and his friendly staff. We have the most delicious donuts around and a huge selection of flavors to select from. We're always happy to take large orders for events of all varieities. </p>
					<h4>Flavors</h4>
					<hr/>
					<p> Our selection of donuts includes, but is not limited to, Lemon Cream, Apple Fritter, Cinnamon, Sugar, Custard, Vanilla Sprinkles, Double Chocolate, Powdered, Maple, Strawberry Jelly, Chocolate Sprinkles, Chocolate Long John, Boston Cream, Chocolate Glazed, and Glazed! </p>

				</div>
				<div className="mocklocation">
					<h3>CONTACT US</h3>
					<hr/>
					<div>
						<h4>Our Location</h4>
						<p>
							340 Donut Blvd
							Donutland, CA 
						</p>
					</div>
					<div className="col-6> mockhours">
						<h4>Our Hours</h4>
						<p>
							Mon-Fri
							8 am - 5 pm
						</p>
					</div>
				</div>
			</div>
		);

		return mockSite;
	}


}

export default MockSite;