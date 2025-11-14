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
        expand="lg"
        collapseOnSelect
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          padding: "12px 0",
          position: "relative",
          zIndex: 1000, // 🔥 Fix dropdown hiding
        }}
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
                fontWeight: "800",
                fontSize: "1.5rem",
                color: "#1e293b",
              }}
            >
              HostelHub
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle />

          <Navbar.Collapse
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Center Search Box */}
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
                  minWidth: "230px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f1f5f9",
                  borderRadius: "25px",
                  padding: "4px 10px",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <SearchBox />
              </div>
            </div>

            {/* Right Side Nav */}
            <Nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {/* More Menu */}
              <NavDropdown
                title="More"
                id="more-menu"
                menuVariant="light"
                style={{
                  fontWeight: "600",
                  color: "#1e293b",
                  position: "relative",
                  zIndex: 2000, // 🔥 ensures dropdown stays above content
                }}
              >
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

              {/* User Menu */}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  menuVariant="light"
                  style={{
                    fontWeight: "600",
                    color: "#1e293b",
                    position: "relative",
                    zIndex: 2000, // 🔥 Fix for user dropdown
                  }}
                >
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
                  <Nav.Link
                    style={{
                      fontWeight: "600",
                      color: "#1e293b",
                    }}
                  >
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
