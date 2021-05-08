import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../../actions/assets/hardware';

const CommentItem = ({
  hardware: { hardware },
  comment: { _id, text, firstname, lastname, title, role, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>
          {firstname} {lastname}
        </h4>
        {/* <p>{title}<p> */}
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>Pateikimo data: {date}</p>
      {!auth.loading && auth.user.role === 'admin' && (
        <button
          onClick={(e) => deleteComment(hardware[0]._id, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  hardware: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  hardware: state.hardware
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
