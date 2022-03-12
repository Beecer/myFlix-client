import React from "react";
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://mymoviesapp775.herokuapp.com/users',{
    Username: username,
    Password: password,
    Email: email
  })
    .then(response => {
      const date = response.data; 
      console.log(date);
      window.open('/', '_self');
      //The second argument '_self' is necessary so that the page will 
      //open in the current tab
    })
    .catch(e => {
      console.log('error registering the user');
      alert('something wasn\'t entered right');
    });
  };

  return(
    <Container>
      <Row>
        <Col> 
         <CardGroup>
           <Card className="bg-light text-black" border='danger' style={{marginTop: 100, marginBottom: 50, borderRadius: 20}}>
             <Card.Title>Please Register</Card.Title>
             <Form>
               <Form.Group>
                 <Form.Label>Username:</Form.Label>
                 <Form.Control 
                   type="text"
                   value={username}
                   onChange={e =>setUsername(e.target.value)}
                   required
                   placeholder="Enter a username"
                   />
               </Form.Group>

               <Form.Group>
                 <Form.Label>Password:</Form.Label>
                 <Form.Control 
                   type="text"
                   value={password}
                   onChange={e =>setPassword(e.target.value)}
                   required
                   minLength="8"
                   placeholder="Enter your password" />
               </Form.Group>

               <Form.Group>
                 <Form.Label>Email</Form.Label>
                 <Form.Control
                   type="email"
                   value={email}
                   onChange={e =>setEmail(e.target.value)}
                   required
                   placeholder="Enter an email" 
                   />
               </Form.Group>

               <Button variant="primary" type="submit"
                 onClick={handleSubmit}>
                 Submit
               </Button>

             </Form>
           </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  )
  
}
