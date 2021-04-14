import React, { Fragment, useState } from 'react';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    password: '',
    password2: '',
  });

  const { firstname, lastname, email, role, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords not match');
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <h5 className="large text-primary">Sukurkite naują naudotoją</h5>
      <p className="lead">
        <i className="fas fa-user"></i> Užpildykite formą:
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Vardas"
            name="firstname"
            value={firstname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Pavardė"
            name="lastname"
            value={lastname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Elektroninis paštas"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Būtinai kurkite naudotoją tik su jo darbiniu elektroniniu paštu!
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Parinkti rolę"
            name="role"
            value={role}
            onChange={(e) => onChange(e)}
            required
          />
          //fix
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Slaptažodis"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Pakartokite slaptažodį"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Patvirtinti" />
      </form>
    </Fragment>
  );
};

export default CreateUser;
