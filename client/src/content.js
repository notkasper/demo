import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import request from 'superagent';
import Select from '@material-ui/core/Select';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Title = styled.h1`
  color: #19196c;
  font-family: myriad-pro, sans-serif;
  margin: 0;
  font-size: 32px;
`;

const Subtitle = styled.h1`
  color: #19196c;
  font-family: myriad-pro, sans-serif;
  margin: 0;
  font-size: 16px;
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

const GreenHighlight = styled.span`
  color: #36b065;
  font-weight: bold;
  font-family: Myriad-Light;
  font-size: 1rem;
`;

const Neutral = styled.span`
  font-family: Myriad-Light;
  font-size: 1rem;
`;

const BlueHighlight = styled.span`
  color: #19196c;
  font-family: Myriad-Light;
  font-weight: bold;
  font-size: 1rem;
`;

const Content = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [areaYieldPath, setAreaYieldPath] = useState(0);

  const load = async () => {
    setLoading(true);
    let response = await request.get('api/v1/crops');
    setCrops(response.body.data);

    response = await request.get('api/v1/areaYield');
    setAreaYieldPath(response.body.data);
    setLoading(false);
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
      <div style={{ display: 'flex', height: '32px', margin: '1rem 0 2rem 0' }}>
        <div style={{ borderRadius: '100%', backgroundColor: '#FD6400', width: '32px', color: 'white' }}>
          <InsertDriveFileOutlinedIcon style={{ marginLeft: '4px', marginTop: '4px' }} />
        </div>
        <Text style={{ marginTop: '5px', marginLeft: '10px' }}>Download report</Text>
      </div>
      {loading ? null : (
        <>
          <Subtitle>Select crop</Subtitle>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ marginBottom: '1rem', minWidth: '10rem' }}
            value={selectedCrop}
            onChange={handleCropChange}
          >
            {crops.map((crop) => (
              <MenuItem value={10}>{crop}</MenuItem>
            ))}
          </Select>
        </>
      )}
      <Card>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Subtitle>Statistics</Subtitle>
              <Neutral>Based on your proposals, you are classified as a </Neutral>
              <BlueHighlight>medium </BlueHighlight>
              <Neutral>sized farm for crop: </Neutral>
              <BlueHighlight>{crops[selectedCrop]}</BlueHighlight>
              <Subtitle>Area / Yield</Subtitle>
              <Neutral>Your yield is </Neutral>
              <GreenHighlight>slightly higher </GreenHighlight>
              <Neutral>than the average of comparable farms.</Neutral>
              <div />
              <img src={areaYieldPath} alt="graph of area vs yield" style={{ width: '50%', height: 'auto' }} />
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Content;
