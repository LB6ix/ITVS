import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { Button } from '@material-ui/core';

const CreateComment = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Parašykite pastabą</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Parašykite pastabą'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Button
          size='large'
          color='secondary'
          variant='contained'
          type='submit'
          value='submit'
          style={{ marginTop: '10px' }}
        >
          Pateikti
        </Button>
      </form>
    </div>
  );
};

CreateComment.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CreateComment);
