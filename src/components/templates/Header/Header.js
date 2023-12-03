import React, { useState, useEffect } from 'react';
import { Input, Menu, Dropdown, Icon, Image, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Header.scss';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const TemplatesHeader = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token && !localStorage.getItem('user')){
      if(!user){
        try {
          $.ajax({
            type: "GET",
            url: 'https://api.imbapano.com/api/user',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            success: function(response){
              console.log(response);
              localStorage.setItem('user', JSON.stringify(response));
            }
          })
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }

    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    if(token){
      setLoggedIn(true);
    }

  },[]);
  
  //  const parent = () =>{
  //     setData(user);
  //   }
  const handleLogout = () => {
    setLoggedIn(false);
    // Clear localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return(
  <div className="templates/Header" data-testid="TemplatesHeader">
   
    <Menu stackable size="small" className="borderless">
    
   <Menu.Item header style={{ marginRight: 'auto', marginLeft: 'auto' }} className="logo">
      <img alt="logo" src='/assets/images/logo.png' />
    </Menu.Item>
    <Menu.Item>
      <Input className='icon' icon='search' placeholder='Search...' />
    </Menu.Item>
    <Menu.Item className='link item'>
      <Link to="/">
        <Icon name="home" />
      Home
      </Link>
    </Menu.Item>
    <Menu.Menu>
      <Dropdown item text='Buy' pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/for-sale">Homes for sale</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/new-estates">New Estates</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/landed-properties">Landed Properties</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu> 

    <Menu.Menu>
      <Dropdown item text='Sale' pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/for-sale">Homes for sale</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/new-estates">New Estates</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/landed-properties">Landed Properties</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu> 
    <Menu.Menu>
      <Dropdown item text='Resources' pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/for-sale">Distress Sale</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/new-estates">Buyers Guide</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/download-app">ImbaPano App</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu> 

    {isLoggedIn ? (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to="/post-property">
            <Button negative size="mini" icon labelPosition="left">
                    <Icon name="add" />
                Post Property
              </Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              trigger={
                <>
                  {user.profile_path ? (
                    <Image avatar src={user.profile_path} />
                  ) : (
                    <Image avatar src='/assets/images/default-avatar.png' />
                    // Replace with the path to your default avatar or placeholder image
                  )}
                  <span style={{ marginLeft: '8px' }}>{user.firstName}</span>
                </>
              }
              pointing='top right'
            >
              <Dropdown.Menu>
                <Dropdown.Header></Dropdown.Header>
                
                  {user.is_verified === 1 ? (
                     <>
                     <Dropdown.Item>
                       <Link to="/profile">Profile</Link>
                     </Dropdown.Item>
                     <Dropdown.Item>
                       <Link to="/account">Manage Account</Link>
                     </Dropdown.Item>
                     <Dropdown.Item>
                       <Link to="/bookmarks">Bookmarks</Link>
                     </Dropdown.Item>
                     <Dropdown.Item>
                       <Link to="/payment">Payment</Link>
                     </Dropdown.Item>
                   </>
                  ) : 
                  <Dropdown.Item>
                    <p style={{ color: 'red' }}>
                      Your phone number is not yet verified. 
                    </p>
                    <Link to="/verify">
                      <Button size="mini">
                        Verify Now
                      </Button>
                    </Link>
                  </Dropdown.Item>
                  }
                
                <Dropdown.Item onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to="/login">
              <Button negative>Login</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/signup">
              <Button primary>Sign Up</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  </div>
)};


export default TemplatesHeader;
