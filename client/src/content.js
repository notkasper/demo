import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

const Title = styled.h1`
  color: #19196c;
  font-family: myriad-pro, sans-serif;
  margin: 0;
  font-size: 32px;
`;

const Crumb = styled.p`
  font-family: myriad-pro, sans-serif;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-family: myriad-pro, sans-serif;
`;

const Header = () => {
  return (
    <Container maxwidth="sm">
      <Crumb>Rural Benchmarking tool &gt;</Crumb>
      <Title>Rural benchmark</Title>
      <div style={{ display: 'flex', height: '32px', margin: '1rem 0' }}>
        <div style={{ borderRadius: '100%', backgroundColor: '#FD6400', width: '32px', color: 'white' }}>
          <InsertDriveFileOutlinedIcon style={{ marginLeft: '4px', marginTop: '4px' }} />
        </div>
        <Text style={{ marginTop: '5px', marginLeft: '10px' }}>Download report</Text>
      </div>
      <Card>
        <CardContent>
          <Title>Graphs!</Title>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Header;
