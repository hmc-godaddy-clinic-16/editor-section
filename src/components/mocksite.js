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
						<div className="col-1">Home&nbsp;&nbsp;&nbsp;&nbsp;Shop&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Cart</div>
					</div>
					<h1 className="mocktitle">MR. DOUGH'S MARVELOUS DOUGHNUTS</h1>
					<h4 className="mockphone">1-800-DOU-NUTS</h4>
				</div>
			</div>
		);

		return mockSite;
	}


}

export default MockSite;