import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import Entrust from './Pages/Entrust';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Entrust />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </>
  )
}

export default App
