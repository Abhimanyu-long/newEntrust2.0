import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Dashboard } from './Pages/Dashboard';
import { Test } from './Pages/Test';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
      </Routes>

    </>
  )
}

export default App
