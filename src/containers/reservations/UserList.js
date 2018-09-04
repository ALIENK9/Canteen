import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '../../components/List';
import TextBox from '../../components/ListItems/TextBox';
import UserReservationItem from '../../components/reservations/UserReservationItem';
import { deleteReservation, getReservations } from '../../redux/actions/reservations/reservations.actions';
import getSearchedReservation from '../selectors/searchuser.selector';

// REVIEW: vedere se fare un PureComponent
class UserList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

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

  handleDelete(id) {
    const { onDelete } = this.props;
    onDelete(id);
  }

  render() {
    const {
      list,
    } = this.props;
    return (
      <React.Fragment>
        {(!list || !list.length) && (
        <span>
          Nessuna prenotazione inserita
        </span>
        )}
        {(list && list.length > 0) && (
        <List>
          { list.map(reserv => (
            <TextBox
              key={reserv.id}
              id={reserv.id}
              onDelete={this.handleDelete}
              deleteLabel={reserv.user
                ? `Rimuovi la prenotazione dell'utente ${reserv.user.name} ${reserv.hour
                  ? `delle ore ${reserv.hour}` : ''}` : ''}
              confirmation
            >
              <UserReservationItem
                name={reserv.user ? reserv.user.name : 'No-name'}
                hour={reserv.hour || '--:--'}
              />
            </TextBox>
          )) }
        </List>
        )}
      </React.Fragment>
    );
  }
}

UserList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    meals: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })),
    user: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    hour: PropTypes.string,
  })),
  moment: PropTypes.oneOf(['lunch', 'dinner']),
  onDelete: PropTypes.func,
  getData: PropTypes.func,
  day: PropTypes.string.isRequired,
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
  list: getSearchedReservation(state.reservations),
  moment: state.reservations.ui.moment,
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteReservation(id)),
  getData: (day, moment) => dispatch(getReservations('users', day, moment)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
