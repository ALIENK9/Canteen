import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Reservation from '../components/Reservation';
import List from '../components/List';
import CollapseBox from '../components/ListItems/CollapseBox';
import { fetchData } from '../redux/reservations/actions';


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

  /* eslint-disable react/destructuring-assignment */
  handleClick(index) {
    const clickedItems = this.state.clickedItems.slice();
    clickedItems[index] = !clickedItems[index];
    const state = {
      clickedItems,
    };
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div id="listbar">
          <h2>
            Giornata
            {' '}
            {this.props.match.params.day}
          </h2>
          {/* barra con servizi */}
        </div>
        <List>
          {this.props.reservations.map((item, index) => (
            <CollapseBox key={item.name} index={index} onClick={this.handleClick}>
              <Reservation {...item} viewList={this.state.clickedItems[index]} />
            </CollapseBox>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reservations: state.reservations,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(fetchData()),
});


ReservationsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  reservations: PropTypes.array,
  getData: PropTypes.array.isRequired,
};

ReservationsList.defaultProps = {
  reservations: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsList);
