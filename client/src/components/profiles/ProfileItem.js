import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, firstname, lastname, email, avatar },
    title,
    department,
    phoneNumber,
    location
  }
}) => {
  return (
    <table className='table'>
      <tr>
        <td>
          <img src={avatar} alt='' className='round-img' />
        </td>
        <td>{firstname}</td>
        <td>{lastname}</td>
        <td>{title}</td>
        <td>{department}</td>
        <td>{location}</td>
        <td>{phoneNumber}</td>
        <td>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            Profilis
          </Link>
        </td>
      </tr>
    </table>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
