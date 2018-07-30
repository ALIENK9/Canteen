import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class CollapseBox
 * Mantains a local 'clicked' property and passes it down to its children
 */
class CollapseBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  }

  render() {
    const { children } = this.props;
    const { clicked } = this.state;
    // when clicked passes down updated property shallow cloning each children
    const childrenWithProp = React.Children.map(children,
      child => React.cloneElement(child, { clicked }));
    const styles = 'flex-item card';
    return (
      <div className={styles} role="button" tabIndex={0} onClick={this.handleClick} onKeyPress={this.handleClick}>
        {childrenWithProp}
      </div>
    );
  }
}

CollapseBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapseBox;
