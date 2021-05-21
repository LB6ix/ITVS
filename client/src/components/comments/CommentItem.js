import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import { formatPostDate } from '../../utility/formatDate';

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
      <p className='my-1' style={{ color: 'gray' }}>
        Pateikimo data: {formatPostDate(date)}
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
      </p>
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
