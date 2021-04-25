import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import CreatePost from './CreatePost';
import { getPosts } from '../../actions/post';
import Loading from '../layout/Loading';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Prašymai</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Pateikite prašymą
      </p>
      <CreatePost />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
