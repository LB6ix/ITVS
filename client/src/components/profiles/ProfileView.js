import React from 'react';
import PropTypes from 'prop-types';

const ProfileView = ({
  profile: {
    user: { _id, firstname, lastname, email, avatar },
    title,
    department,
    phoneNumber,
    location
  }
}) => {
  return (
    <div class='profile-top bg-primary p-2'>
      <img class='round-img my-1' src={avatar} alt='' />
      <h1 class='large'>
        {firstname} {lastname}
      </h1>
      <p class='lead'>
        {title}, {department}
      </p>
      <p>
        Kontaktai: {email}, {phoneNumber}
      </p>
      <p>Vieta: {location}</p>
    </div>
  );
};

ProfileView.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileView;
