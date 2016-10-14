import React from "react";
import ReactDOM from "react-dom";
import InputBox from "./inputbox.js";
import Button from "./button.js";

class Display extends React.Component {
	render() {
		return (
			<div>
				<p>Title</p>
				<InputBox />
				<p>Text</p>
				<InputBox />
				<p><Button /></p>
			</div>);
	}
}

// TODO: store input when submit button is clicked.

ReactDOM.render(<Display />, document.getElementById("app"));