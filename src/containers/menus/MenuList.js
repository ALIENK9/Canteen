import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '../../components/List';
import CheckBox from '../../components/ListItems/CheckBox';
import MenuItem from '../../components/MenuItem';
import {
  clearMessages, toggleMeal, getAllData,
} from '../../redux/actions/menus/menus.actions';
import { mapTypeToString } from '../utils';
import getVisibleMenu, { getMoment } from '../selectors/menufilter.selector';

/**
 * Gestisce la lista di piatti nel menù
 */
class MenuList extends Component {
  componentDidMount() {
    const {
      day, getData,
    } = this.props;
    getData(day);
  }

  render() {
    const {
      onItemClick, moment, entries,
    } = this.props;
    return (
      <React.Fragment>
        {(!entries || !entries.length) && (
        <span>
          Nessun piatto inserito. Aggiungi dei piatti prima.
        </span>
        )}
        {entries && entries.length > 0 && (
          <List>
            {entries.map(meal => (
              <CheckBox
                key={meal.id}
                id={meal.id}
                onClick={onItemClick}
                checked={meal.checked}
                param={moment}
              >
                <MenuItem name={meal.name} type={mapTypeToString(meal.type)} />
              </CheckBox>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}

MenuList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    checked: PropTypes.bool,
    name: PropTypes.string,
  })),
  onItemClick: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  day: PropTypes.string.isRequired,
  moment: PropTypes.oneOf(['lunch', 'dinner']),
};

MenuList.defaultProps = {
  entries: {
    lunch: [],
    dinner: [],
  },
  moment: 'lunch',
};

const mapStateToProps = state => ({
  entries: getVisibleMenu(state.menus), // selettore per state.menus.data.entries,
  loading: state.menus.ui.loading,
  moment: getMoment(state.menus),
  error: state.menus.messages.error,
  success: state.menus.messages.success,
});


const mapDispatchToProps = dispatch => ({
  getData: day => dispatch(getAllData(day)),
  onItemClick: (id, newVal, moment) => dispatch(toggleMeal(id, newVal, moment)),
  closeMessage: () => dispatch(clearMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
