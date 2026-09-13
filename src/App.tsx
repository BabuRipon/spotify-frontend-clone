import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useUserData } from './context/UserContext';
import Loading from './components/Loading';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import Admin from './pages/Admin';

const App = () => {
  const { loading , isAuth} = useUserData();
  return (
    <>
      {
        loading?
        <Loading />
        :
        (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/login' element={isAuth ? <Home />:<Login />} />
              <Route path='/register' element={isAuth? <Home />:<Register />} />
              <Route path='/playlist' element={isAuth ? <Playlist/> : <Login />} />
              <Route path='/album/:id' element={<Album />} />
              <Route path='/admin/dashboard' element={isAuth ? <Admin /> : <Login />}/>
            </Routes>
          </BrowserRouter>
        )
      }    
    </>
  )
}

export default App;
