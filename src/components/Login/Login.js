import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Message, Icon, Button, Form, Divider } from 'semantic-ui-react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.scss';
import Header from '../templates/Header/Header';
import $ from 'jquery';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  $('.login-form').off('submit').on('submit', function(){
    setLoading(true);
    const formData = {
       email: email,
       password: password,
     };
     
     const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      }
     $.ajax({
      type: "POST",
      url: "https://api.imbapano.com/api/login",
      data: JSON.stringify({email: email, password: password}),
      contentType: 'application/json',
      cache: false,
      processData: false,
      success: function(response) {
        if(response.status_code === 201){
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          // setLoading(false);
          navigate('/account');
        }
        else{
          setError(response.message);
          setLoading(false);
        }
        
      },
      error: function() {
        setError('Something went wrong');
        setLoading(false);
      }
    });
     return false;
   });

  return (
  <div className="Login" data-testid="Login">
    <Header />
    <div className="login-container">
      <div className="login-background">
          <div className="login-content">
          <Container>
              <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Col md="5">
                  <div className="box">
                  <Form onSubmit={handleSubmit} className="login-form" loading={loading}>
                  <h4 className="header text-center">Login into your account</h4>
                  <Divider />
                  <Form.Field>
                    <label>Email</label>
                    <Form.Input
                      icon={<Icon name="envelope" color="red" />}
                      iconPosition="left"
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Form.Input
                      icon={<Icon name="key" color="red" />}
                      iconPosition="left"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Field>
                  <Button type="submit" color="red" style={{ width: '100%' }}>
                    Login
                  </Button>
                </Form>
                <Message>
                    <p>
                      <Link to="/forgot-password">
                        Forgot Password?
                      </Link>
                    </p>
                    <p>
                      Don't have an account?{' '}
                      <Link to="/signup">Create Account</Link>
                    </p>
                  </Message>

                  {error && (
                      <Message negative style={{width: '100%'}}>
                        <Message.Header>Error</Message.Header>
                        <p>{error}</p>
                      </Message>
                    )}
                    </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
    </div>
  </div>
  )
};

export default Login;
