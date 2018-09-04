import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import ConfirmModal from '../ConfirmModal';

/**
 * Stateful components which add a delete button to a list item.
 * Require a 'onDelete' func, with 'id' on which delete func will be called
 * 'deleteLabel' is the title of the delete button. Optionally show
 * a confirmation modal in 'confirmation' is true
 */
class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleReject = this.handleReject.bind(this);
  }

  handleConfirmation() {
    this.setState({ show: true });
  }

  handleReject() {
    this.setState({ show: false });
  }

  render() {
    const {
      children, deleteLabel, confirmation, onDelete, id,
    } = this.props;
    const { show } = this.state;
    const styles = 'flex-item card';

    return (
      <div className={styles}>
        {children}
        <div>
          <ConfirmModal
            show={show}
            confirm={() => onDelete(id)}
            reject={this.handleReject}
            message="Confermi l'eliminazione?"
          />
          <Button onClick={confirmation ? () => this.handleConfirmation() : () => onDelete(id)} bsStyle="danger" title={deleteLabel}>
            <Glyphicon glyph="glyphicon glyphicon-trash" />
          </Button>
        </div>
      </div>
    );
  }
}

TextBox.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  deleteLabel: PropTypes.string.isRequired,
  confirmation: PropTypes.bool,
};

TextBox.defaultProps = {
  children: null,
  confirmation: false,
};

export default TextBox;
