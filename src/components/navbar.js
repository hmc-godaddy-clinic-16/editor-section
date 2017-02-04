import React from 'react';
import './navbar.css';
import localStrings from './localStrings.json';


var normalButtons = [
	{
		'id': 1, 
		label: localStrings.edit, 
		icon: require('./images/editgrey.svg'), 
		iconhover: require('./images/editwhite.svg')
	},
	{
		'id': 2, 
		label: localStrings.layouts, 
		icon: require('./images/layoutgrey.svg'), 
		iconhover: require('./images/layoutwhite.svg')},
	{
		'id': 3, 
		label: localStrings.styles, 
		icon: require('./images/slidergrey.svg'), 
		iconhover: require('./images/sliderwhite.svg')}
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
		    	isCurrent={(this.props.currentMode === type.id)}
		    	currentMode={1}
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
	
		var iconStyle = {
			'width': '18px',
			'height': '18px'
		};
		return (
		<span className={this.props.isCurrent ? 'NavBar-activeButton' : 
		(this.state.hover ? 'NavBar-hoverButton' : 'NavBar-styleButton')} 
		onClick={this.handleClick} 
		onMouseDown={this.handleClick}
		onMouseDown={this.onToggle} 
		onMouseEnter={this.onHovered} 
		onMouseLeave={this.onHovered}> 
			<div> <img src={this.props.isCurrent ? 
				this.props.iconhover
				:(this.state.hover? this.props.iconhover : this.props.icon)}  style={iconStyle}/> </div>
			{this.props.label} 
		</span>

		);
	}
}   
	
export default NavigationBar;