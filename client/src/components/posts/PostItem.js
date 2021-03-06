import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { formatPostDate } from '../../utility/formatDate';
import DeleteIcon from '@material-ui/icons/Delete';

const PostItem = ({
  deletePost,
  auth,
  post: {
    _id,
    text,
    firstname,
    lastname,
    email,
    category,
    avatar,
    user,
    comments,
    date
  },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>
          {firstname} {lastname} {email}
        </h4>
        <h4> {email} </h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>Prašymo data: {formatPostDate(date)}</p>
      <div className='bg-category p'>
        <h4 style={{ width: '200px' }}>Kategorija: {category} </h4>
      </div>

      {/* fix */}

      {showActions && (
        <Fragment>
          {!auth.loading && auth.isAuthenticated && (
            <Link to={`/posts/${_id}`}>
              <Button
                size='small'
                variant='contained'
                color='primary'
                style={{ marginTop: '5px' }}
              >
                Pastabos{'   '}
                {comments.length > 0 && (
                  <span className='comment-count'>({comments.length})</span>
                )}
              </Button>
            </Link>
          )}
          {!auth.loading && auth.isAdmin && (
            <IconButton
              style={{ display: 'inline-block' }}
              className='tableActions'
              aria-label='delete'
              variant='contained'
              color='secondary'
              size='medium'
              onClick={() => deletePost(_id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostItem);
