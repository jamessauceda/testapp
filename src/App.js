import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Routes from './Routes';
import { authUser, signOutUser } from './libs/awsLib';
import RouteNavItem from './components/RouteNavItem';
import './App.css';

const Nav = styled.div`
  padding: 20px 0;
  font-size: 18px;

  a {
    padding-right: 20px;
  }
`;
const Right = styled.div`
  float: right;
`;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25px;
  font-size: 10px;
  letter-spacing: 0.3px;
  text-align: center;
  font-weight: 600;
`;
const StyledLink = styled(NavLink)`
  padding-right: 20px;
`;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    };
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <Nav>
            <StyledLink to="/">James Martin Sauceda</StyledLink>
            <Right>
              <StyledLink activeClassName="is-active" to="/music">
                Music
              </StyledLink>
              <StyledLink activeClassName="is-active" to="/photography">
                Photography
              </StyledLink>
              <a href="mailto:jamesmartinsauceda@gmail.com?subject=From jamessauceda.com">
                Contact
              </a>
            </Right>
          </Nav>

          <Routes childProps={childProps} />
          <Footer>
            Copyright © 2019 James Martin Sauceda. All Rights Reserved. Contact
            me{' '}
            <a href="mailto:jamesmartinsauceda@gmail.com?subject=From jamessauceda.com">
              jamesmartinsauceda@gmail.com
            </a>
          </Footer>
        </div>
      )
    );
  }
}

export default withRouter(App);
