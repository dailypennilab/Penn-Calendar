import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const StudentCard = ({ student }) => {
  return (
    <Card key={student._id}>
      {student.imageUrl && <Image src={student.imageUrl} alt={student.name} />}
      <Content>
        <Title>{student.name}</Title>
        <Detail>Major: {student.major || "Undeclared"}</Detail>
        <Detail>Class of {student.graduationYear || "TBD"}</Detail>
        <Icons>
          {student.linkedin && (
            <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          )}
          {student.email && (
            <a href={`mailto:${student.email}`}>
              <FaEnvelope />
            </a>
          )}
        </Icons>
      </Content>
    </Card>
  );
};

export default StudentCard;

// Styled Components for StudentCard
const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #2f2f2f;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.03);
    background-color: #800000;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    height: auto;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 40%;
    height: auto;
  }
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 60%;
    padding: 12px;
  }
`;

const Title = styled.h3`
  margin-top: 8px;
  font-weight: bold;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Detail = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  font-size: 1.2rem;
  color: #0077b5; // LinkedIn's color

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #004182;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
  margin-top: 20px;
  transition: background-color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    background-color: #6a6a6a;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    margin-top: 10px;
  }
`;