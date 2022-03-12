import React, {useState} from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";

import './login-view.scss';

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
      <Container>
        <Row>
          <Col med={4}>
            <Card className="bg-light text-black" border='danger' style={{marginTop: 100, marginBottom: 50, borderRadius: 20}}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center'}}>Welcome to MyMoviesApp!</Card.Title>
                <Form className="login-border">
                 <Form.Group controlId="formUsername">
                   <Form.Label>Username:</Form.Label>
                   <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                 </Form.Group>
               
                 <Form.Group controlId="formPassword">
                   <Form.Label>Password:</Form.Label>
                   <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                 </Form.Group>
                 <Button style={{marginTop: 5, marginBottom: 15}}variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                
                <Form.Group controlId="formRegistration">
                  <Form.Label>New Here?</Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Sign Up</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

