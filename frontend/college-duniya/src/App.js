import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CollegeDetails } from './components/collegeDetails/collegeDetails';
import { Home } from './components/home/home';
import { Navbar } from './components/navbar/navbar';
import { StudentDetails } from './components/studentDetails/studentDetails';

export const API_URL = "https://college-world2.herokuapp.com"

export function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/collegeDetails/:id' element={<CollegeDetails />}></Route>
        <Route path='/studentDetails/:id' element={<StudentDetails />}></Route>
      </Routes>
    </div>
  );
}

// export default App;
