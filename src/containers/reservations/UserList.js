import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '../../components/List';
import TextBox from '../../components/ListItems/TextBox';
import UserReservationItem from '../../components/reservations/UserReservationItem';
import { deleteReservation, getReservations } from '../../redux/actions/reservations/reservations.actions';

// REVIEW: vedere se fare un PureComponent
class UserList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { getData, moment } = this.props;
    console.log('didMount userlist', moment);
    getData(moment);
  }

  componentDidUpdate(prevProps) {
    const { getData, moment } = this.props;
    if (moment !== prevProps.moment) {
      console.log('updated');
      getData(moment);
    }
  }

  handleDelete(id) {
    const { onDelete, moment } = this.props;
    onDelete(moment, id);
  }

  render() {
    const {
      list,
    } = this.props;
    // const dayMeals = getMeals(match.params.day, moment);
    console.log('UserList list', list);
    return (
      <List>
        {console.log('ddddddddddddddddddddaaaaaaaaaaaaaaaati', list)}
        { list.map(reserv => (
          <TextBox key={reserv.id} id={reserv.id} onDelete={this.handleDelete}>
            <UserReservationItem
              name={reserv.user ? reserv.user.name : 'No-name'}
              hour={reserv.hour}
              meals={reserv.meals}
            />
          </TextBox>
        )) }
      </List>
    );
  }
}

UserList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    meals: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })),
    user: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
    hour: PropTypes.string,
  })),
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  onDelete: PropTypes.func,
  getData: PropTypes.func,
};

UserList.defaultProps = {
  list: [
    {
      id: 0,
      meals: [],
      user: { name: '', id: null },
      hour: '00:00',
    },
  ],
  moment: 'lunch',
  getData: () => {},
  onDelete: () => {},
};

const mapStateToProps = state => ({
  list: state.reservations.data.list,
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  onDelete: (moment, id) => dispatch(deleteReservation(moment, id)),
  getData: moment => dispatch(getReservations('users', moment)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
