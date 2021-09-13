import { useEffect } from 'react';
import request from 'superagent';
import Header from './header';
import Content from './content';

const App = () => {
  const load = async () => {
    let response = await request.get('/api/v1/test');
    console.log(JSON.stringify(response.body));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
};

export default App;
