import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';
import formatDate from '../../utility/formatDate';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const CommentItem = ({
  postId,
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
        <IconButton
          style={{ display: 'inline-block' }}
          className='tableActions'
          aria-label='delete'
          variant='contained'
          color='secondary'
          size='large'
          onClick={() => deleteComment(postId, _id)}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
