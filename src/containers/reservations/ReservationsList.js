import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReservationItem from '../../components/reservations/ReservationItem';
import List from '../../components/List';
import CollapseBox from '../../components/ListItems/CollapseBox';
import { mapTypeToString } from '../utils';
import { getReservations } from '../../redux/actions/reservations/reservations.actions';
import getVisibleDishes from '../selectors/dishfilter.selector';

class ReservationsList extends Component {
  componentDidMount() {
    const { getData, day, moment } = this.props;
    getData(day, moment);
  }

  componentDidUpdate(prevProps) {
    const { getData, day, moment } = this.props;
    if (moment !== prevProps.moment) {
      getData(day, moment);
    }
  }

  render() {
    const { list } = this.props;
    return (
      <React.Fragment>
        {(!list || !list.length) && (
        <span>
          Nessuna prenotazione inserita
        </span>
        )}
        {(list && list.length > 0) && (
        <List>
          {list.map(item => (
            <CollapseBox key={item.id}>
              <ReservationItem
                id={item.id}
                name={item.name}
                reslist={item.reslist}
                type={mapTypeToString(item.type)}
              />
            </CollapseBox>
          ))}
        </List>
        )}
      </React.Fragment>
    );
  }
}

ReservationsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    hour: PropTypes.string,
  })),
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  getData: PropTypes.func,
  day: PropTypes.string.isRequired,
};

ReservationsList.defaultProps = {
  list: [{
    name: '',
    hour: '00:00',
  }],
  moment: 'lunch',
  getData: () => [],
};

const mapStateToProps = state => ({
  list: getVisibleDishes(state.reservations),
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  getData: (day, moment) => dispatch(getReservations('meals', day, moment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsList);
