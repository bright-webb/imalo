import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verify.scss';
import Header  from '../templates/Header/Header';
import { Form, Input, Button, Message, Segment, Divider } from 'semantic-ui-react';
import { Col, Container, Row } from 'react-bootstrap';
import $ from 'jquery';


const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [error, setError] = useState(null);
   const [user, setUser] = useState(null);
  const [setName] = useState(null);
  const [setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [message, setMessage] = useState(null);


  const useCountdown = (initialCountdown) => {
    const [countdown, setCountdown] = useState(initialCountdown);
    const [isActive, setIsActive] = useState(true);
  
    useEffect(() => {
      let timer;
  
      const startCountdown = () => {
        timer = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 0) {
              clearInterval(timer);
              setIsActive(false);
              setMessage(null);
            }
            return Math.max(prevCountdown - 1, 0);
          });
        }, 1000);
      };
  
      if (isActive) {
        startCountdown(); // Start countdown initially
      }
  
      return () => clearInterval(timer); // Cleanup the interval on component unmount
  
    }, [initialCountdown, isActive]);
  
    const resetCountdown = () => {
      setCountdown(initialCountdown);
      setIsActive(true);
    };
  
    return { countdown, resetCountdown };
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);

    if (token && user) {
      setLoggedIn(true);
      setUser(user);
      setName(user.firstName+' '+user.lastName);
    }
    
    $('.otp-form').off('submit').on('submit', function(){
      setLoading(true);
      const otpCode = $('input[name="otp"]').val(); // Get otp value using jquery

      $.ajax({
        type: "POST",
        url: 'https://api.imbapano.com/api/auth/verify/phone/code',
        data: JSON.stringify({otp: otpCode}),
        dataType: 'json',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
        success: function(response){
          if(response.status_code === 201){
            navigate('/account');
          }
          else{
            setError(response.message);
            setLoading(false);
          }
        },
        error: function(){
          setError('Something went wrong, please try again');
          setLoading(false);
        }
      })
      return false;
    });
  }, []);

   const { countdown , resetCountdown } = useCountdown(60);

   // handle resend otp button
    const handleOTP = ()=>{
      setButtonLoading(true);
        $.ajax({
          type: "POST",
          url: 'https://api.imbapano.com/api/auth/phone/token',
          dataType: 'json',
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          success: function(response){
            if(response.status_code === 201){
              setMessage(response.message);
              resetCountdown();
              setButtonLoading(false);
              
            }
            else{
              setError(response.message);
              setButtonLoading(false);
            }
          },
          error: function(){
            setError('Something went wrong, please try again');
            setLoading(false);
          }
        })
    }


  const handleInputChange = (e) => {
    setOTP(e.target.value);
    setError(null); // Clear error when the user starts typing
  };
  return (
  <div className="Verify" data-testid="Verify">
    <Header />

    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md="4">
        <Segment>
          <div classnNme='header' textAlign='center'>
            <strong>Verify your phone number</strong><hr />
            <p>OTP has been sent to your phone number ending in {user?.phone?.slice(-4)}.</p>
          </div>
          <Divider />
          <Form className="otp-form">
            <Form.Field>
              <label>OTP Code</label>
              <Input
                type="number"
                placeholder="Enter OTP"
                name="otp"
                min={100000}  
                max={999999}  
                value={otp}
                onChange={handleInputChange}
                required
              />
            </Form.Field>
            <Button loading={loading} negative style={{width: '100%'}}>
             Verify
            </Button>
            {error && <Message negative content={error} style={{width: '100%'}} />}
          </Form>
          <Divider />
          
            <Button primary size="mini" onClick={handleOTP}  loading={buttonLoading} disabled={countdown > 0}>
              Resend OTP {countdown > 0 ? `(${countdown}s)` : ''}
            </Button>
          {message && <Message positive content={message} style={{width: '100%'}} />}
        </Segment>
        </Col>
      </Row>
    </Container>
  </div>
)};


export default Verify;
