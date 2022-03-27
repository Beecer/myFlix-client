import React, {useState} from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import './login-view.scss';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  //Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(username.length < 5){
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq=false;
    }else if(password.length < 6){
      setPassword('Password must be 6 characters long');
      isReq = false;
    }
    
    return isReq;
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
    /* send a request to the servere for authentication */
    axios.post('https://mymoviesapp775.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
   }
  };

    return (
      
        <Row>
          <Col med={4}>
            <Card className="bg-light text-black" border='danger' style={{marginTop: 100, marginBottom: 50, borderRadius: 20}}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center'}}>Welcome to MyMoviesApp!</Card.Title>
                <Form className="login-border">
                 <Form.Group controlId="formUsername">
                   <Form.Label>Username:</Form.Label>
                   <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
                   {/* code added here to display validation error */ }
                   {usernameErr && <p>{usernameErr}</p>}
                 </Form.Group>
               
                 <Form.Group controlId="formPassword">
                   <Form.Label>Password:</Form.Label>
                   <Form.Control type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                   {/* code added here to display validation error */ }
                   { passwordErr && <p>{passwordErr}</p>}
                 </Form.Group>
                 <Button style={{marginTop: 15, marginBottom: 15}}variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      
    );
  }

