import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import PostItem from '../posts/PostItem';
import CreateComment from '../comments/CreateComment';
import CommentItem from '../comments/CommentItem';
import { getPost } from '../../actions/post';
import { Button } from '@material-ui/core';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Link to={`/posts`}>
        <Button size='large' variant='contained' color='primary'>
          Grįžti į prašymų sąrašą
        </Button>
      </Link>
      <PostItem post={post} showActions={false} />
      <CreateComment postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
