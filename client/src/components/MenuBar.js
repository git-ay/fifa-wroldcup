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
              <NavLink active href="/">
                Home
              </NavLink>

              <NavLink active  href="/matches" >
                Matches
              </NavLink>

              <NavItem>
                  <NavLink active  href="/TeamPage" >
                      Teams
                  </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active  href="/statAnalysis" >
                      Analysis
                  </NavLink>
              </NavItem>


          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar


