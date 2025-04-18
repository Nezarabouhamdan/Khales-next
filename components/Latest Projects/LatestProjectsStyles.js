import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

// 1) Define the keyframes
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(90px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Section = styled.section`
  padding: 70px 0;
  background-color:rgb(255, 255, 255);
  opacity: 1;
  transform: translateY(60px);
  transition: opacity 0.6s ease, transform 0.6s ease;
margin-top:-100px;
border-top-left-radius: 40px 40px;
border-top-right-radius: 40px 40px;

`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;
export const Title = styled.div`
  margin-bottom: 70px;
  text-align: center;
  h2 {
    font-size: 45px;
    margin: 0;
  }
       @media (max-width: 968px) {
         margin-bottom:00px;

         h2 {
    font-size: 30px;
    margin: 0;
  }
  }
`;
export const TabsLinksWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
export const NavPills = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
  li {
    margin-right: 10px;
  }
  button {
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 50px;
    transition: background 0.3s;
    &:hover,
    &.active {
      background: #66a109;
      color: #fff;
    }
  }
`;
export const AllProjectsLink = styled(Link)`
  display: inline-block;
  border: 1px solid #66a109;
  border-radius: 50px;
  padding: 10px 20px;
  color: #66a109;
  text-decoration: none;
  transition: background 0.3s;
  &:hover {
    background: #66a109;
    color: #fff;
  }
`;
export const ProjectsWrapper = styled.div`
  position: relative;
`;
export const FloatCursor = styled.div`
  position: absolute;
  left: 50%;
  bottom: -30px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  line-height: 1.2;
`;
export const ProjectCard = styled.div`
  background: #fff;
  border-radius: 0px;
  border-top-left-radius: 20px 20px;
border-top-right-radius: 20px 20px;
    height: 80vh;
    border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  /* Fade in & slide up on mount */
  opacity: 0;
  transform: translateY(90px);
  animation: fadeInUp 1s ease forwards;

   &:nth-child(odd) { animation-delay: 0.4s; }
     &:nth-child(even) { animation-delay: 0.8s; } 

  transition: transform 0.6s ease, box-shadow 0.6s ease;

  &:hover {
    transform: scale(1.05) rotate(0.5deg);
    box-shadow: 0 12px 18px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
       @media (max-width: 968px) {
       height: 100%;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 20px;
  object-fit: fill;
   @media (max-width: 968px) {
       height: 40%;
  }
  
  
`;
export const ProjectInfo = styled.div`
  padding: 15px;
`;
export const ProjectTags = styled.div`
  margin-bottom: 10px;
  a {
    margin-right: 5px;
    font-size: 14px;
    color: #66a109;
    text-decoration: none;
  }
`;
export const ProjectTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 10px;
  a {
    color: #333;
    text-decoration: none;
  }
    @media (max-width: 968px) {
  font-size: 15px;
  }
`;
export const ProjectText = styled.div`
  font-size: 14px;
  color: #666;
   @media (max-width: 968px) {
  font-size: 10px;
  }
`;