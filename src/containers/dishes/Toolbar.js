import React, { PureComponent } from 'react';
import {
  Button, Glyphicon, ToggleButton, ToggleButtonGroup, ButtonToolbar,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { filterMeals, showAddForm } from '../../redux/actions/dishes.actions';


class Toolbar extends PureComponent {
  render() {
    const {
      showAll, showMain, showSecond, showSide, openAddModal,
    } = this.props;
    return (
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
  }
}

Toolbar.propTypes = {
  showAll: PropTypes.func.isRequired,
  showMain: PropTypes.func.isRequired,
  showSecond: PropTypes.func.isRequired,
  showSide: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  showAll: () => dispatch(filterMeals('ALL')),
  showMain: () => dispatch(filterMeals('MAIN')),
  showSecond: () => dispatch(filterMeals('SECOND')),
  showSide: () => dispatch(filterMeals('SIDE')),
  openAddModal: () => dispatch(showAddForm()), // cambia show a true
});

export default withRouter(connect(null, mapDispatchToProps)(Toolbar));
