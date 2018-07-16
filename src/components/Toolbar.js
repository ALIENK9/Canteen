import {
  Button, Glyphicon, ToggleButton, ToggleButtonGroup, ButtonToolbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable react/no-array-index-key */

// REVIEW: POTREBBE ESSERE PIÙ ESTENSIBILE
/**
 *
 * @param {Object} props to know what buttons, searchbar and add button
 */
const Toolbar = ({
  buttons, search, add, // showAll, showMain, showSecond, showSide, openAddModal,
}) => (
  <div id="listbar">
    <ButtonToolbar className="button-toolbar">
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        {buttons.map((button, index) => (
          <ToggleButton onClick={button.func} value={index + 1} key={index}>
            {button.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {add.presence && (
      <Button onClick={add.func} className="pull-right" bsStyle="primary">
        <Glyphicon glyph="glyphicon glyphicon-plus" />
      </Button>
      )}
      {search.presence && (
      <Button onClick={search.func} className="pull-right" bsStyle="primary">
        Here should be a search bar (to be implemented)
      </Button>
      )}
    </ButtonToolbar>
  </div>
);

Toolbar.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
  })).isRequired,
  search: PropTypes.shape({
    presence: PropTypes.bool.isRequired,
    func: PropTypes.func.isRequired,
  }).isRequired,
  add: PropTypes.shape({
    presence: PropTypes.bool.isRequired,
    func: PropTypes.func.isRequired,
  }).isRequired,
};

export default Toolbar;
