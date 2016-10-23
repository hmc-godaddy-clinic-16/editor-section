import React from "react";

class Hello extends React.Component {
  render () {
    let decorator = "";
    if (this.props.special) {
      decorator = "!!!";
    }

    let children = this.props.name.map(
      (name, index) => {
        return <p key={index}>Hello {name}{decorator}</p>
      });

    return (
      <div onClick={() => {
        if (this.props.onClick) {
          this.props.onClick();
        }
      }}>
        { children }
      </div>
    );
  }
}

Hello.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  name: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Hello;
