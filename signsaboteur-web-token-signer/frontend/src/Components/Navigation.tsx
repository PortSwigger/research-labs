import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import Flask from './Flask';
import Express from './Express';
import reactLogo from '../assets/DogeSaboteur.png'

const Navigation = () => {
  return (
    <>
    <nav className='flex items-center h-24 shadow-sm shadow-slate-950'>
        <img src={reactLogo} className='p-1 mr-8 h-24 object-cover rounded-full'/>
        <div className='mr-auto font-bold'>SignSaboteur</div>
        <div className='mr-4 font-bold underline'><Link to="/">Home</Link></div>
        <div className='mr-4 font-bold underline'><Link to="/flask">Flask</Link></div>
        <div className='mr-4 font-bold underline'><Link to="/express">Express</Link></div>
    </nav>
    <span className='p-1'></span>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flask" element={<Flask />} />
      <Route path="/express" element={<Express />} />
    </Routes>
    </>
  )
}

export default Navigation
