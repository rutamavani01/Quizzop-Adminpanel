import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './Routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/Style.css';
function App() {
  return (
    <div className='min-h-screen flex flex-col content-between'>
      <div className='flex-1'>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
