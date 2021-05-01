import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import CreatePost from './CreatePost';
import { getPosts, getUserPosts } from '../../actions/post';
import Loading from '../layout/Loading';
import profile from '../../reducers/profile';
import { Link } from 'react-router-dom';

const Posts = ({
  getPosts,
  profile: { profile },
  post: { posts, loading },
  getUserPosts,
  showActions,
  isAuthenticated,
  isAdmin
}) => {
  useEffect(() => {
    {
      isAdmin && getPosts();
    }
    {
      !loading && isAuthenticated && !isAdmin && getUserPosts();
    }
  }, [getPosts, getUserPosts]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {showActions && (
        <Fragment>
          {profile !== null ? (
            <div>
              <h1 className='large text-primary'>Prašymai</h1>
              <p className='lead'>
                <i className='fas fa-user' /> Pateikite prašymą
              </p>
              <CreatePost />
            </div>
          ) : (
            <Fragment>
              <p>
                Jūs nesate užpildę asmeninės informacijos, prašome tai padaryti
                kuo greičiau!
              </p>{' '}
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Susikurti profilį
              </Link>
            </Fragment>
          )}
          <div className='posts'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Posts.defaultProps = {
  showActions: true
};

Posts.propTypes = {
  profile: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  getPosts: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getPosts, getUserPosts })(Posts);
