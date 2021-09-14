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
import AspectRatioOutlinedIcon from '@material-ui/icons/AspectRatioOutlined';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';

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

const OrangeHighlight = styled.span`
  color: #fd6400;
  font-family: Myriad-Light;
  font-weight: bold;
  font-size: 1rem;
`;

const CardText = styled.h1`
  color: #19196c;
  font-family: myriad-pro, sans-serif;
  margin: 0;
  font-size: 32px;
`;

const Content = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [areaYieldPath, setAreaYieldPath] = useState(0);
  const [yieldCostPath, setYieldCostPath] = useState(0);

  const loadCrops = async () => {
    setLoading(true);
    let response = await request.get('api/v1/crops');
    setCrops(response.body.data);
  };

  const loadGraphs = async () => {
    const cropParam = crops[selectedCrop];
    if (!cropParam) return;
    let response = await request.get(`api/v1/areaYield/${cropParam}`);
    setAreaYieldPath(response.body.data);

    response = await request.get(`api/v1/yieldCost/${cropParam}`);
    setYieldCostPath(response.body.data);
    setLoading(false);
  };

  useEffect(() => {
    loadCrops();
  }, []);

  useEffect(() => {
    loadGraphs();
  }, [selectedCrop]);

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  console.log(`${selectedCrop}: ${crops[selectedCrop]}`);

  return (
    <Container maxwidth="xs">
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
            {crops.map((crop, index) => (
              <MenuItem key={`${index}-${selectedCrop}`} value={index}>
                {crop}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '1rem', marginBottom: '1rem' }}>
        <Card>
          <CardContent>
            <div style={{ display: 'flex' }}>
              <AspectRatioOutlinedIcon
                style={{ color: '#19196c', height: 'auto', width: '3rem', marginRight: '1rem' }}
              />
              <CardText>50 acres</CardText>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div style={{ display: 'flex' }}>
              <LocalFloristOutlinedIcon
                style={{ color: '#19196c', height: 'auto', width: '3rem', marginRight: '1rem' }}
              />
              <CardText>10 tonnes</CardText>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div style={{ display: 'flex' }}>
              <AttachMoneyOutlinedIcon
                style={{ color: '#19196c', height: 'auto', width: '3rem', marginRight: '1rem' }}
              />
              <CardText>34.5</CardText>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card style={{ marginBottom: '1rem' }}>
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
            </>
          )}
        </CardContent>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1rem' }}>
        <Card>
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Subtitle>Area / Yield</Subtitle>
                <Neutral>Your yield is </Neutral>
                <GreenHighlight>slightly higher </GreenHighlight>
                <Neutral>than the average of comparable farms.</Neutral>
                <div />
                <img src={areaYieldPath} alt="graph of area vs yield" style={{ width: '100%', height: 'auto' }} />
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Subtitle>Yield / Cost</Subtitle>
                <Neutral>Your cost is </Neutral>
                <OrangeHighlight>slightly higher </OrangeHighlight>
                <Neutral>than the average of farms with a comparable yield.</Neutral>
                <div />
                <img src={yieldCostPath} alt="graph of area vs yield" style={{ width: '100%', height: 'auto' }} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Content;
