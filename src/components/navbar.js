import React from 'react';
import './navbar.css';

class NavigationBar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		// let className = 'NavBar-styleButton';
	 //      if (this.props.active) {
	 //        className += ' NavBar-activeButton';
	 //      }

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

			//var editIcon = './uxpin-icon-set_compose.png';


			return (
			<span className={className} onMouseDown={this.onToggle} onMouseEnter={this.onHovered} onMouseLeave={this.onHovered}> 
				<div> <img src={this.props.icon}  style={iconStyle}/> </div>
				{this.props.label} 
			</span>

			);
		}
	}   
		// TODO: CAN'T IMPORT IMAGES FROM RELATIVE FOLDER?? HAVE 
		// USE SERVER URL
		const NAV_BUTTONS = [
			{label: 'Edit', icon: 'http://www.freeiconspng.com/uploads/edit-new-icon-22.png'},
			{label: 'Layout', icon: 'http://www.pixempire.com/images/preview/layout-sidebar-at-left-icon.jpg'},
			{label: 'Style', icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/70487-200.png'}
		];

		const EditButton = (props) => {
			return (
				<span className="NavBar-controls">
				{NAV_BUTTONS.map((type) =>
					<NavButton
					  label={type.label}
					  icon={type.icon}

					/>
				)}
				</span>
			);

		}
	
export default NavigationBar;
			
