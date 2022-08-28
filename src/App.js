import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      {/* <LoginPage /> */}
    </BrowserRouter>
  );
};

export default App;
