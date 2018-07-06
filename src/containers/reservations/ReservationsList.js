import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReservationItem from '../../components/ReservationItem';
import List from '../../components/List';
import CollapseBox from '../../components/ListItems/CollapseBox';
import { getReservations } from '../../redux/actions/reservations.actions';
import { compareDishes } from '../utils';


class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItems: props.reservations ? Array(props.reservations.length).fill(false) : [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getData } = this.props;
    getData();
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
    const { match, reservations } = this.props;
    const { state } = this;
    return (
      <div>
        <div id="listbar">
          <h2>
            Giornata
            {' '}
            {match.params.day}
          </h2>
          {/* barra con servizi */}
        </div>
        <List>
          {reservations.map((item, index) => (
            <CollapseBox key={item.name} index={index} onClick={this.handleClick}>
              <ReservationItem {...item} viewList={state.clickedItems[index]} />
            </CollapseBox>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reservations: state.reservations.list.sort(compareDishes),
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getReservations()),
});


ReservationsList.propTypes = {
  match: PropTypes.any.isRequired,
  reservations: PropTypes.array,
  getData: PropTypes.func.isRequired,
};

ReservationsList.defaultProps = {
  reservations: [],
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationsList));
