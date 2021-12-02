import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="secondary" expand="md">
        <NavbarBrand href="/">WorldCup Statistics </NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/players">
                Players
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/matches" >
                Matches
              </NavLink>
            </NavItem>
            <NavItem>
                  <NavLink active  href="/IntroPage" >
                      IntroPage
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink active  href="/TeamPage" >
                      TeamPage
                  </NavLink>
              </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar


