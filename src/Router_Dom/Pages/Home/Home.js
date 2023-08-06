import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/Firebase';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import img from '../updatedv6.png';
import Post from './Post';

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Montserrat, sans-serif;
  background-color: #f0f0f0; 
  border-radius:60%;
`;

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const WelcomeText = styled.div`
  width: 50%;
  text-align: left;
  padding:100px 0 0 0;

`;

const WelcomeImageContainer = styled.div`
  width: 100%;
  max-height:100%;
  display: flex;
  justify-content: center;
  padding:50px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

const WelcomeImage = styled.img`
  width: 50%;
  max-height: 50%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;
const WelcomeHeading = styled.h1`
  font-family: Montserrat, sans-serif;
  color: #333;
  font-size: 3.5rem;
  line-height: 1.5;
  font-weight: 900;
  margin-bottom: 10px;
`;

const WelcomeDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #555;
  text-align: left;
  margin-bottom: 20px;
  margin-top:50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  border-radius: 8px;
  padding: 20px;
  background-color: #EFEFFA;
`;

const SignUpButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  background-color: #525FE1;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color,box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #11009E;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
 

`;
const LearnMoreLink = styled.div`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-top:150px;
`;
const WelcomeDescriptionbox = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
 `;

function Home() {
  const Navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [showDesc, setShowDesc] = useState(null);

  const handleshowDesc = () => {
    setShowDesc(!showDesc);
    !showDesc && alert("Scroll Down Bro")
  }

  const handleOnClick = () => {
    Navigate('/signUp');
  };

  return (
    <>
      {!user ? (
        <>
          <Container>
            <WelcomeSection>
              <WelcomeImageContainer>
                <WelcomeText>
                  <WelcomeHeading>Welcome to V6<span style={{ color: 'red' }}>&#10084;</span> Family</WelcomeHeading><br />
                  <SignUpButton onClick={handleOnClick}>Sign Up</SignUpButton>
                  <LearnMoreLink onClick={handleshowDesc}>{showDesc ? <>less..aboutV6 < span style={{ color: 'red' }}>&#10084;</span></> : <>more..aboutV6<span style={{ color: 'red' }}>&#10084;</span> </>}</LearnMoreLink>
                </WelcomeText>
                <WelcomeImage src={img} alt='image' />
              </WelcomeImageContainer>
            </WelcomeSection>
          </Container>
          {showDesc && <div style={{ padding: 5 }}>
            <WelcomeDescription>
              <WelcomeDescriptionbox>
                Welcome to the V6<span style={{ color: 'red' }}>&#10084;</span> Family, where friendships thrive, and creativity knows no bounds! Join our close-knit community of amazing individuals from all walks of life. Share your unique thoughts, ideas and experiences with like-minded people who are passionate about building strong connections. Together, we embark on a journey of inspiration, laughter, and support. Sign up now to become a part of our vibrant and inclusive V6<span style={{ color: 'red' }}>&#10084;</span> Friends Group, and let's make unforgettable memories<span style={{ color: 'red' }}>&#10084;</span> together!
              </WelcomeDescriptionbox>
            </WelcomeDescription>
          </div>}
        </>
      ) : (
        <Post />
      )
      }
    </>
  );
}

export default Home;
