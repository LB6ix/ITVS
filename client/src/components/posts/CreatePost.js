import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const CreatePost = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    text: '',
    category: ''
  });

  const { text, category } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   addPost(formData);
  // };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Pateikite prašymą</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, category });
          setFormData({
            text: '',
            category: ''
          });

          //   setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Prašymo pateikimo vieta'
          value={text}
          //   onChange={(e) => setText(e.target.value)}
          onChange={(e) => onChange(e)}
          required
        />
        <div className='form-group'>
          <select
            name='category'
            value={category}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Pasirinkite prašymo kategoriją</option>
            <option value='Turto prašymas'>Turto prašymas</option>
            <option value='Turto remontas'>Turto remontas</option>
            <option value='Licencijos'>Lincencijos</option>
            <option value='IT prašymas'>IT prašymas</option>
            <option value='Konsultacija'>Konsultacija</option>
          </select>
          <small className='form-text'>FIXXXXXXXXXXX</small>
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(CreatePost);
