import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

class DishItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    console.log(event);
    const { onDelete, id } = this.props;
    onDelete(id);
    event.preventDefault();
  }

  render() {
    const { name, type, description } = this.props;
    return (
      <div className="w3-container w3-center">
        <div className="card-title">
          <strong>
            {name}
          </strong>
          <div className="pull-right">
            <Button onClick={e => this.handleDelete(e)} bsStyle="danger" aria-hidden="true">
              <Glyphicon glyph="glyphicon glyphicon-trash" />
            </Button>
          </div>
        </div>
        <div className="card-subtitle">
          {type}
        </div>
        <div className="card-content">
          <p>
            {description}
          </p>
        </div>
      </div>
    );
  }
}

DishItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

DishItem.defaultProps = {
  description: null,
};

export default DishItem;
