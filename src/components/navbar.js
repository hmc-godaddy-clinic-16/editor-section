import React from 'react';
import './navbar.css';

var normalButtons = [
	{'id': 1, label: 'Edit', icon: require('file-loader!./editgrey.svg'), iconhover: require('file-loader!./editwhite.svg')},
	{'id': 2, label: 'Layouts', icon: require('file-loader!./layoutgrey.svg'), iconhover: require('file-loader!./layoutwhite.svg')},
	{'id': 3, label: 'Styles', icon: require('file-loader!./slidergrey.svg'), iconhover: require('file-loader!./sliderwhite.svg')}
];

class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(mode){
		this.props.changeMode(mode);
	}

	render() {
		return (
			<div className="NavBar-root">
			{normalButtons.map((type) =>
				<NavButton
				label={type.label}
				icon={type.icon}
		    	iconhover={type.iconhover}
		    	handleClick={this.handleClick.bind(this, type)}
		    	key={type.id}
		    	isCurrent={(this.props.currentTab == type.id)}
				/>
			)}
			</div>

	);}
}

class NavButton extends React.Component {
	constructor() {
		super();
		this.onToggle = this.onToggle.bind(this);
		this.onHovered = this.onHovered.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			isActive: false,
			hover: false
		};
	}

	handleClick(e){
		e.preventDefault();
		this.props.handleClick();
	}

	onToggle() {
		var active = !(this.state.isActive);
		this.setState({isActive: active});
	}

	onHovered() {
		var active = !(this.state.hover);
		this.setState({hover: active});
	}

	render(){
		let className = 'NavBar-styleButton';
		if (this.state.isActive) {
			className = 'NavBar-activeButton';
		}
		else if (this.state.hover){
			className = 'NavBar-hoverButton';
		}

		var iconStyle = {
			'width': '18px',
			'height': '18px'
		};
		return (
		<span className={className} 
		onClick={this.handleClick} 
		onMouseDown={this.handleClick}
		onMouseDown={this.onToggle} 
		onMouseEnter={this.onHovered} 
		onMouseLeave={this.onHovered}> 
			<div> <img src={this.state.isActive? 
				this.props.iconhover
				:(this.state.hover? this.props.iconhover : this.props.icon)}  style={iconStyle}/> </div>
			{this.props.label} 
		</span>

		);
	}
}   
	
export default NavigationBar;
			

			
