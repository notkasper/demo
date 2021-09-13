import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import request from 'superagent';
import Select from '@material-ui/core/Select';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import MenuItem from '@material-ui/core/MenuItem';

const Title = styled.h1`
  color: #19196c;
  font-family: myriad-pro, sans-serif;
  margin: 0;
  font-size: 32px;
`;

const Crumb = styled.p`
  font-family: Myriad-Light;
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-family: Myriad-Light;
  font-size: 1rem;
`;

const Content = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(0);

  const load = async () => {
    let response = await request.get('api/v1/crops');
    setCrops(response.body.data);

    response = await request.get('api/v1/areaYield');
    console.log(JSON.stringify(response.body));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  console.log(crops);

  return (
    <Container maxwidth="sm">
      <div style={{ display: 'flex' }}>
        <Crumb>Rural Benchmarking tool</Crumb>
        <Crumb style={{ marginLeft: '1.5rem' }}>&gt;</Crumb>
      </div>
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCrop}
            onChange={handleCropChange}
          >
            {crops.map((crop) => (
              <MenuItem value={10}>{crop}</MenuItem>
            ))}
          </Select>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Content;
