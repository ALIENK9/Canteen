import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import TextBox from '../ListItems/TextBox';
import UserReservationItem from './UserReservationItem';

const UserList = ({ list, onDelete }) => (
  <List>
    {console.log(list)}
    { list.map(user => (
      <TextBox key={user.id} id={user.id} onDelete={onDelete}>
        <UserReservationItem name={user.name} hour={user.hour} meals={user.meals} />
      </TextBox>
    ))
        }
  </List>
);

UserList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

UserList.defaultProps = {
  list: [],
  onDelete: () => {},
};

export default UserList;
