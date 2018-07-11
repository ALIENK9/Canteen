import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReservationItem from './ReservationItem';
import List from '../List';
import CollapseBox from '../ListItems/CollapseBox';
import { mapTypeToString } from '../../containers/utils';

class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItems: props.list ? Array(props.list.length).fill(false) : [],
    };
    this.handleClick = this.handleClick.bind(this);
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
  list: PropTypes.array,
  // getData: PropTypes.func.isRequired,
};

ReservationsList.defaultProps = {
  list: [],
};

export default ReservationsList;


/* class ReservationsList extends Component {
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
    const { reservations } = this.props;
    const { state } = this;
    return (
      <div>
        <div id="listbar">
        </div>
        <List>
          {reservations.map((item, index) => (
            <CollapseBox key={item.name} index={index} onClick={this.handleClick}>
              <ReservationItem
              {...item} type={mapTypeToString(item.type)} viewList={state.clickedItems[index]} />
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
}); */

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationsList));
