import styled from 'styled-components';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import ravoSVG from './rabosvg.svg';

const Container = styled.div`
  padding: 0 3rem 1.5rem 3rem;
  display: grid;
  grid-template-columns: 1fr 5fr 5fr;
  padding-top: 20px;
  background-color: white;
`;

const StyledLink = styled.a`
  font-family: Myriad-Light;
  font-size: 1rem;
  font-weight: 1000;
  padding: 0 12px;
  :hover {
    cursor: pointer;
    color: #fd6400;
  }
`;

const Header = () => {
  return (
    <Container>
      <img src={ravoSVG} alt="rabo logo" style={{ height: '24px', width: '108px' }} />
      <div style={{ padding: '0 32px' }}>
        <StyledLink>Overview</StyledLink>
        <StyledLink>Products</StyledLink>
        <StyledLink>Insight</StyledLink>
        <StyledLink>Store</StyledLink>
        <StyledLink>Self service</StyledLink>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <ChatBubbleOutlineOutlinedIcon />
        <StyledLink>Contact</StyledLink>
        <PersonOutlineOutlinedIcon />
        <StyledLink>Profile</StyledLink>
        <PowerSettingsNewOutlinedIcon />
        <StyledLink>Logout</StyledLink>
      </div>
    </Container>
  );
};

export default Header;
