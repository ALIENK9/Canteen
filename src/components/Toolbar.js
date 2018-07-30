import {
  Button, Glyphicon, ToggleButton, ToggleButtonGroup, ButtonToolbar, Panel, ButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

// REVIEW: POTREBBE ESSERE PIÙ ESTENSIBILE
/**
 *
 * @param {Object} props to know what buttons, searchbar and add button
 */
const Toolbar = ({
  buttons, defaultButtonKey, search, add,
}) => (
  <Panel>
    <Panel.Body>
      <ButtonToolbar className="NObutton-toolbar">
        <ToggleButtonGroup role="group" type="radio" name="options" defaultValue={defaultButtonKey}>
          {buttons.map(button => (
            <ToggleButton onClick={button.func} value={button.key} key={button.key}>
              {button.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {add.presence && (
          <ButtonGroup role="group">
            <Button onClick={add.func} className="" bsStyle="primary">
              <Glyphicon glyph="glyphicon glyphicon-plus" />
            </Button>
          </ButtonGroup>
        )}

        {search.presence && (
          <ButtonGroup role="group">
            <Button onClick={search.func} className="pull-right" bsStyle="primary">
                Here should be a search bar (to be implemented)
            </Button>
          </ButtonGroup>
        )}
      </ButtonToolbar>
    </Panel.Body>
  </Panel>
);

Toolbar.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.any.isRequired,
    func: PropTypes.func.isRequired,
  })).isRequired,
  defaultButtonKey: PropTypes.any.isRequired,
  search: PropTypes.shape({
    presence: PropTypes.bool.isRequired,
    func: PropTypes.func,
  }).isRequired,
  add: PropTypes.shape({
    presence: PropTypes.bool.isRequired,
    func: PropTypes.func,
  }).isRequired,
};

export default Toolbar;
