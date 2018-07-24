import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    const { getData, view, moment } = this.props;
    console.log('didMount userlist', view, moment);
    getData(view, moment);
  }

  componentDidUpdate(prevProps) {
    const { getData, view, moment } = this.props;
    if (view !== prevProps.view || moment !== prevProps.moment) {
      console.log('updated');
      getData(view, moment);
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
        { list.map(reserv => (
          <TextBox key={reserv.id} id={reserv.id} onDelete={this.handleDelete}>
            {console.log(reserv)}
            <UserReservationItem
              name={reserv.user ? reserv.user.name : 'Help'}
              hour={reserv.hour}
              meals={reserv.meals}
            />
          </TextBox>
        )) }
      </List>
    );
  }
}

/* const UserList = ({ list, onDelete }) => (
  <List>
    {console.log(list)}
    { list.map(user => (
      <TextBox key={user.id} id={user.id} onDelete={onDelete}>
        <UserReservationItem name={user.name} hour={user.hour} meals={user.meals} />
      </TextBox>
    ))
        }
  </List>
); */

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
  view: PropTypes.oneOf(['users', 'meals']),
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
  view: 'users',
  moment: 'lunch',
  getData: () => {},
  onDelete: () => {},
};

const mapStateToProps = state => ({
  list: state.reservations.data.list,
  view: state.reservations.ui.view,
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  onDelete: (moment, id) => dispatch(deleteReservation(moment, id)),
  getData: (view, moment) => dispatch(getReservations(view, moment)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));
