import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';
import logo from '../Pages/updatedv6.png';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled.div`
  background-color: #34495E;
  padding: 15px;
  margin-bottom:5px;
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  font-family: 'Roboto', sans-serif;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 50px;
  object-fit: contain; 
  border-radius:45%
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const NavLinkItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  padding: 10px 15px; 
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1A5276;
    text-decoration: none; 
  }

  &.active {
    font-weight: bold;
    background-color: #1A5276;
  }
`;


const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfileImage = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  object-fit: cover;
`;

const SignOutButton = styled.button`
  background-color: #4285F4; 
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: #0D47A1; 
  }
`;


function Navbar() {
  const [user] = useAuthState(auth);
  const Navigate = useNavigate();

  const signUserOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      Navigate('/');
    }
  };


  return (
    <NavbarContainer>
      <Link to="/Logo">
        <LogoImage src={logo} alt="logo" />
      </Link>
      <NavLinks>
        <NavLinkItem to="/">Home</NavLinkItem>
        <NavLinkItem to="/Createpost">Create Post</NavLinkItem>
        {user && (
          <UserProfile>
            <div>
              <UserProfileImage src={user?.photoURL || "default-profile-image-url"} alt="sandesh" width="25" height="25" />
            </div>
            <div>{user?.displayName || "Guest"}</div>
            <SignOutButton onClick={signUserOut}>Sign Out</SignOutButton>
          </UserProfile>
        )
        }
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
