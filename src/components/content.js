import React from "react";
import './link.css';

class Content extends React.Component {
	render () {
		var contentStyle = {
			'color': 'white',
			'textAlign': 'center'
		};

		return (
			// TO DO: Change appearance of announcement on link hover
			<a href={this.props.data.link}>
				<div style={contentStyle}>
					<h1 id="title">{this.props.data.title}</h1>
					<p id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.content}} />
				</div>
			</a>
	)}
}

export default Content;