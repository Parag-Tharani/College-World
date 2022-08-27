import './App.css';
import { Data } from './components/data/data';
import { Home } from './components/home/home';
import { Navbar } from './components/navbar/navbar';

export const API_URL = "http://localhost:8080"

export function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Data />
    </div>
  );
}

// export default App;
