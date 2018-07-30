import { Button, Glyphicon } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';


// function goBack = history => history.goBack();

const BackButton = ({ history }) => (
  <Button onClick={history.goBack}>
    <span className="gliph-text">
      Indietro
    </span>
    <Glyphicon glyph="glyphicon glyphicon-arrow-left" />
  </Button>
);

BackButton.propTypes = {
  history: PropTypes.object.isRequired,
};

export default BackButton;
