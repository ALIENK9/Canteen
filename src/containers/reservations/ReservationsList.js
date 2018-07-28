import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReservationItem from '../../components/reservations/ReservationItem';
import List from '../../components/List';
import CollapseBox from '../../components/ListItems/CollapseBox';
import { mapTypeToString, getVisibleDishes } from '../utils';
import { getReservations } from '../../redux/actions/reservations/reservations.actions';

class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItems: props.list ? Array(props.list.length).fill(false) : [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getData, view, moment } = this.props;
    getData(view, moment);
  }

  componentDidUpdate(prevProps) {
    const { getData, view, moment } = this.props;
    if (view !== prevProps.view || moment !== prevProps.moment) {
      console.log('updated', view, moment);
      getData(view, moment);
    }
  }


  handleClick(index) {
    let { clickedItems } = this.state;
    clickedItems = clickedItems.slice();
    clickedItems[index] = !clickedItems[index];
    const state = {
      clickedItems,
    };
    this.setState(state);
  }

  render() {
    const { list } = this.props;
    const { state } = this;
    return (
      <List>
        {list.map((item, index) => (
          <CollapseBox key={item.id} index={index} onClick={this.handleClick}>
            <ReservationItem
              {...item}
              type={mapTypeToString(item.type)}
              viewList={state.clickedItems[index]}
            />
          </CollapseBox>
        ))}
      </List>
    );
  }
}

ReservationsList.propTypes = {
  // match: PropTypes.any.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    hour: PropTypes.string,
  })),
  view: PropTypes.oneOf(['users', 'meals']),
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  getData: PropTypes.func,
};

ReservationsList.defaultProps = {
  list: [{
    name: '',
    hour: '00:00',
  }],
  view: 'meals',
  moment: 'lunch',
  getData: () => [],
};

const mapStateToProps = (state) => {
  const { list } = state.reservations.data;
  const { filter } = state.reservations.ui;
  return {
    list: getVisibleDishes(list, filter),
    view: state.reservations.ui.view,
    moment: state.reservations.ui.moment,
  };
};

const mapDispatchToProps = dispatch => ({
  getData: (view, moment) => dispatch(getReservations(view, moment)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationsList));
