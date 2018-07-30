import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

const TextBox = ({ children, onDelete, id }) => {
  const styles = 'flex-item card';
  return (
    <div className={styles}>
      <div role="textbox">
        {children}
      </div>
      <div className="pull-right">
        <Button onClick={() => onDelete(id)} bsStyle="danger" aria-hidden="true">
          <Glyphicon glyph="glyphicon glyphicon-trash" />
        </Button>
      </div>
    </div>
  );
};

/* class TextBox extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { onDelete, id } = this.props;
    onDelete(id);
  }

  render() {
    const { children, onDelete, id } = this.props;
    const styles = 'flex-item w3-card w3-hover-shadow';
    return (
      <div className={styles}>
        <div role="textbox">
          {children}
        </div>
        <div className="pull-right">
          <Button onClick={() => onDelete(id)} bsStyle="danger" aria-hidden="true">
            <Glyphicon glyph="glyphicon glyphicon-trash" />
          </Button>
        </div>
      </div>
    );
  }
} */

TextBox.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,
  id: PropTypes.number.isRequired,
};

TextBox.defaultProps = {
  children: null,
  onDelete: () => {},
};

export default TextBox;
