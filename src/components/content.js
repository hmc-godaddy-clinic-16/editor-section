import React from "react";
import './css/content.css';

/* Content renders the title and body. 
   Thin layout only renders the title. */
class Content extends React.Component {
	render () {
		var contentStyle = {
			'color': 'white',
			'textAlign': 'center',
		};

		return (
			<div style={contentStyle}>
				<p id="title">{this.props.data.title}</p>
			</div>
	)}
}

export default Content;