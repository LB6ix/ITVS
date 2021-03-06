import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/assets/hardware';
import { Button } from '@material-ui/core';

const CreateComment = ({ hardware: { hardware }, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Parašykite įrangos pastabą</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(hardware[0]._id, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Parašykite įrangos pastabą'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <Button
          size='medium'
          color='secondary'
          variant='contained'
          type='submit'
          value='submit'
          style={{ marginTop: '10px' }}
        >
          Pridėti įrangos pastabą
        </Button>
      </form>
    </div>
  );
};

CreateComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  hardware: state.hardware
});

export default connect(mapStateToProps, { addComment })(CreateComment);
