import React,{useEffect} from 'react'
import Auth from '../pages/Auth'
import { useSelector } from 'react-redux'
import Navbar from './UI/Navbar'
import Render from './UI/Render';

const AppRouter = () => {  
  const isAuth = useSelector(state => state.auth.isAuth)      

  return (
    < >            
      {
        !isAuth ? 
          <Auth /> :                    
          <div>                      
              <Navbar />              
              <Render  />            
          </div>
      }
    </>
  )
}

export default AppRouter
