import React from "react";
import { Form, Button } from "react-bootstrap";

export function UpdatedUser(props){
  const user = props.userdata
  const { handleSubmit, handleUpdate} = props;
  
  return (
    <>
    
      <Form className="profile-form" onSubmit={(e) =>handleSubmit(e)} border='danger' style={{marginTop: 50, marginBottom: 50}}>
      <h5>Update Profile</h5>
    
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
           type='text'
           name='Username'
           defaultValue={user.Username}
           onChange={e => handleUpdate(e)} 
           />
        </Form.Group>
       
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
           type='text'
           name='Password'
           defaultValue={user.Password}
           onChange={e => handleUpdate(e)} 
           />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
           type='text'
           name='Email'
           defaultValue={user.Email}
           onChange={e => handleUpdate(e)}           
           />
        </Form.Group>
      
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
    </Form> 
    </>
  )
}

