// src/components/homeComponents/banner.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RightCol from './rightCol';

const Banner = ({ featuredEvents }) => (
  <BannerWrapper>
    <LeftColumn>
      <TopBanner>
        <BannerOverlay />
        <BannerContent>
          <Title>Events@Penn</Title>
          <BannerText>
            The Daily Pennsylvanian brings you every major event at Penn with easy ways to view, register, and engage!
            Keep an eye on your favorite organizations, or that next company you want to recruit for.
          </BannerText>
        </BannerContent>
      </TopBanner>
      <Box2>
        <BigTitle>Featured Events</BigTitle>
      </Box2>
      <BottomRow>
        {featuredEvents.map((event, index) => (
          <FeaturedEventBox key={index}>
            {event.imageUrl && <FeaturedImage src={event.imageUrl} alt={event.name} />}
            <FeaturedContent>
              <SubTitle>{event.name}</SubTitle>
              <StyledLink to={`/events/${event._id}`}>
                <ViewButton>View Event</ViewButton>
              </StyledLink>
            </FeaturedContent>
          </FeaturedEventBox>
        ))}
      </BottomRow>
    </LeftColumn>
    <RightColumn>
      <RightCol />
    </RightColumn>
  </BannerWrapper>
);

export default Banner;

// Styled Components
const BannerWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: stretch;
  height: 80vh;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    order: 2;
    margin-top: 20px;
  }
`;

const TopBanner = styled.div`
  position: relative;
  background-image: url('/banner.jpeg');
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  display: flex;
  align-items: center;
  color: white;
  height: 200px;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.5);
`;

const BannerContent = styled.div`
  position: relative;
  max-width: 33%;
  padding: 20px;
  z-index: 1;
  text-align: left;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const BigTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const BottomRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturedEventBox = styled.div`
  flex: 1;
  background-color: #2f2f2f;
  color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 250px;

  &:hover {
    background-color: #800000;
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const FeaturedContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const SubTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BannerText = styled.p`
  font-size: 1rem;
  margin: 4px 0;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-top: auto;
`;

const ViewButton = styled.button`
  background-color: #000000;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background-color: #6a6a6a;
  }
`;

const Box2 = styled.div`
  flex: 1;
  background-image: url('/holi.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 0px 20px;
  border-radius: 8px;
  text-align: left;
`;
