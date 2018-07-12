import React, { PureComponent } from 'react';
import {
  Button, Glyphicon, ToggleButton, ToggleButtonGroup, ButtonToolbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// REVIEW: HACK: qui è tutto da sistemare
const Toolbar = ({
  buttons, search, add, // showAll, showMain, showSecond, showSide, openAddModal,
}) => (
  <div id="listbar">
    <ButtonToolbar className="button-toolbar">
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton onClick={showAll} value={1}>
                Tutti
        </ToggleButton>
        <ToggleButton onClick={showMain} value={2}>
                Primi
        </ToggleButton>
        <ToggleButton onClick={showSecond} value={3}>
                Secondi
        </ToggleButton>
        <ToggleButton onClick={showSide} value={4}>
                Contorni
        </ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={openAddModal} className="pull-right" bsStyle="primary">
        <Glyphicon glyph="glyphicon glyphicon-plus" />
      </Button>
    </ButtonToolbar>
  </div>
);

Toolbar.propTypes = {
  showAll: PropTypes.func.isRequired,
  showMain: PropTypes.func.isRequired,
  showSecond: PropTypes.func.isRequired,
  showSide: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
};
