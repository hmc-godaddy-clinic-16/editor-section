import React from "react";

class Content extends React.Component {
	render () {
		var contentStyle = {
			'color': 'white',
			'textAlign': 'center'
		};

		return (
			// TO DO: Change appearance of announcement on link hover
			<div style={contentStyle}>
				<h1 id="title">{this.props.data.title}</h1>
				<div id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.content}} />
			</div>
	)}
}

export default Content;