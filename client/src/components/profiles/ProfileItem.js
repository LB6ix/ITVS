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
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{firstname}</h2>
        <p>
          {title} {department && <span>, {department}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        {/* MAP TO TABLW */}
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          Peržiūrėti profilį
        </Link>
      </div>
      {/* <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
