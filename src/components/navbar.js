import React from 'react';
import './navbar.css';

class NavigationBar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="NavBar-root">
				<EditButton/>
			</div>

	);}
}
	class NavButton extends React.Component {
		constructor() {
			super();
			this.onToggle = this.onToggle.bind(this);
			this.onHovered = this.onHovered.bind(this);
			this.state = {
				isActive: false,
				hover: false
			};
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
			<span className={className} onMouseDown={this.onToggle} onMouseEnter={this.onHovered} onMouseLeave={this.onHovered}> 
				<div> <img src={this.state.isActive? 
					this.props.iconhover
					:(this.state.hover? this.props.iconhover : this.props.icon)}  style={iconStyle}/> </div>
				{this.props.label} 
			</span>

			);
		}
	}   

		
		var normalButtons = [
			{label: 'Edit', icon: require('file-loader!./editgrey.svg'), iconhover: require('file-loader!./editwhite.svg')},
			{label: 'Layouts', icon: require('file-loader!./layoutgrey.svg'), iconhover: require('file-loader!./layoutwhite.svg')},
			{label: 'Styles', icon: require('file-loader!./slidergrey.svg'), iconhover: require('file-loader!./sliderwhite.svg')}
		];




		const EditButton = (props) => {
			var buttonState;
			if (props.onHovered){
				buttonState = activeButtons;
			}
			buttonState = normalButtons;
			return (
				<span className="NavBar-controls">
				{buttonState.map((type) =>
					<NavButton
					  label={type.label}
					  icon={type.icon}
					  iconhover={type.iconhover}
					  onToggle={props.onToggle}
					  onHovered={props.onHovered}


					/>
				)}
				</span>
			);

		}
	
export default NavigationBar;
			

			
