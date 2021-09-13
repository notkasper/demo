import { useEffect } from 'react';
import request from 'superagent';

const App = () => {
  const load = async () => {
    const response = await request.get('/api/v1/test');
    console.log(JSON.stringify(response.body));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
      </header>
    </div>
  );
};

export default App;
