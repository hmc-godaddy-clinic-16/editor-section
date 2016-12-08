import React from "react";

/* Content renders the title and body. */
class Content extends React.Component {
	render () {
		var contentStyle = {
			'color': 'white',
			'textAlign': 'center',
		};

		return (
			<div style={contentStyle}>
				<h1 id="title">{this.props.data.title}</h1>
				<div id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
			</div>
	)}
}

export default Content;