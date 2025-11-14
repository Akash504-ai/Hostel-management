import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{ padding: "8px 0" }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <LinkContainer to="/">
            <Navbar.Brand
              style={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                marginRight: "20px",
              }}
            >
              HostelHub
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Centered SearchBox with rounded style */}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "30%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f1f3f4",
                  borderRadius: "20px",
                  padding: "4px 10px",
                }}
              >
                {/* You can edit SearchBox component, but this wrapper makes it rounded */}
                <SearchBox/>
              </div>
            </div>

            {/* Right Side Nav */}
            <Nav
              className="ms-auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {/* Dropdown */}
              <NavDropdown title="More" id="more-menu">
                <LinkContainer to="/attendance">
                  <NavDropdown.Item>Attendance</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/addStudent">
                  <NavDropdown.Item>Add Student</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/analysis">
                  <NavDropdown.Item>View Analysis</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              {/* User */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  {userInfo.isAdmin && (
                    <LinkContainer to="/userList">
                      <NavDropdown.Item>Users List</NavDropdown.Item>
                    </LinkContainer>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
