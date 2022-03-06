import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthday] = useState('');

  const handleSubmit = (e) =>
  {e.preventDefault();
  console.log(username, password, email, birthdate);
   /* send a request to the servere for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(register)
  };

  return (
    <form>
      <label>
        Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
      Password:
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
      Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
      Birthday:
          <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape ({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date.isRequired
  }).isRequired,
  onRegistration: PropTypes.func.isRequired
};
