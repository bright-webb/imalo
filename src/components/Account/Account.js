import { useEffect, useState } from "react";
import NavHeader from "../templates/Header/Header";
import { Link } from "react-router-dom";
import {
  Menu,
  Grid,
  Container,
  Icon,
  Segment,
  Button,
  Header,
  Label,
  Divider,
  Image,
  Loader
} from "semantic-ui-react";
import "./Account.scss";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  let [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('https://api.imbapano.com/api/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Set loading to false whether successful or not
        }
      }
    };

    fetchData();
  }, []);


  return (
    <div className="Account" data-testid="Account">
      <NavHeader />

      <Container style={{ marginTop: "20px" }}>
      <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu vertical className="remove-style">
                {/* Profile Section */}
                <Menu.Item>
                  <Menu.Header>Profile</Menu.Header>
                  <Menu.Menu>
                    <Link to="/my-account">
                      <Menu.Item>
                        <Icon name="user" />
                        My Account
                      </Menu.Item>
                    </Link>
                    <Link to="/settings">
                      <Menu.Item>
                        <Icon name="settings" />
                        Settings
                      </Menu.Item>
                    </Link>
                  </Menu.Menu>
                </Menu.Item>

                {/* Listings Section */}
                <Menu.Item>
                  <Menu.Header>Listings</Menu.Header>
                  <Menu.Menu>
                    <Link to="/my-listings">
                      <Menu.Item>
                        <Icon name="list alternate outline" />
                        My Listings
                      </Menu.Item>
                    </Link>
                    <Link to="/search-properties">
                      <Menu.Item>
                        <Icon name="search" />
                        Search Properties
                      </Menu.Item>
                    </Link>
                  </Menu.Menu>
                </Menu.Item>

                {/* Favorites Section */}
                <Link to="/favorites">
                  <Menu.Item>
                    <Icon name="heart" />
                    Favorites
                  </Menu.Item>
                </Link>

                {/* Messages Section */}
                <Link to="/messages">
                  <Menu.Item>
                    <Icon name="mail" />
                    Messages
                  </Menu.Item>
                </Link>

                {/* Appointments Section */}
                <Link to="/appointments">
                  <Menu.Item>
                    <Icon name="calendar alternate outline" />
                    Appointments
                  </Menu.Item>
                </Link>

                {/* Financials Section */}
                <Link to="/financials">
                  <Menu.Item>
                    <Icon name="dollar sign" />
                    Financials
                  </Menu.Item>
                </Link>

                {/* Settings Section */}
                <Menu.Item>
                  <Menu.Header>Settings</Menu.Header>
                  <Menu.Menu>
                    <Link to="/general-settings">
                      <Menu.Item>
                        <Icon name="cogs" />
                        General
                      </Menu.Item>
                    </Link>
                    <Link to="/help-support">
                      <Menu.Item>
                        <Icon name="help circle" />
                        Help/Support
                      </Menu.Item>
                    </Link>
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
            </Grid.Column>

            <Grid.Column width={12}>
            {loading ? (
              <Loader active inline="centered" />
            ) : (
              <>
                {/* Profile Overview */}
                <Segment className="remove-style">
                  <Header as="h4">
                    {user.profile_path ? (
                      <Image avatar src={user.profile_path} />
                    ) : (
                      <Image avatar src="/assets/images/default-avatar.png" />
                    )}
                    <Header.Content>
                      {user.firstName} {user.lastName}
                      <Header.Subheader>{user.email}</Header.Subheader>
                      <Header.Subheader>{user.phone}</Header.Subheader>
                    </Header.Content>
                  </Header>

                  <Label color="teal" size="tiny">
                    {user.userType}
                  </Label>

                  <Divider />

                  {/* Buttons */}
                  <Link to="/post-property">
                  <Button
                    negative
                    size="mini"
                    icon
                    labelPosition="left"
                  >
                    <Icon name="add" />
                    Post New Property
                  </Button>
                  </Link>
                  <Button
                    color="green"
                    size="mini"
                    icon
                    labelPosition="left"
                    onClick={() => console.log('Edit Profile')}
                  >
                    <Icon name="edit" />
                    Edit Profile
                  </Button>
                </Segment>

                <Segment className="remove-style">
                <Header as="h4">
                  <Icon name="list alternate outline" />
                  <Header.Content>Property Listings</Header.Content>
                </Header>
                {/* Sample Property Listings */}

                <p>You have not listed any property yet</p>
              </Segment>

              {/* Favorites and Saved Properties */}
              <Segment className="remove-style">
                <Header as="h4">
                  <Icon name="heart" />
                  <Header.Content>Favorites</Header.Content>
                </Header>

                <p>Nothing here</p>
              </Segment>

              <Segment className="remove-style">
                <Header as="h4">
                  <Icon name="bell outline" />
                  <Header.Content>Notifications</Header.Content>
                </Header>

                <p>No new notification</p>
              </Segment>
              </>
            )}
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Account;
