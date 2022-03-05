import React, {useState} from "react";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* send a request to the servere for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username)
  };

    return (
      <form>
        <label>
          Username: 
          <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
        </label>
        <label>
          Password: 
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
        </label>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }

