import React from 'react'
import { useSelector } from 'react-redux'
import Search from '../../pages/Search'
import Admin from '../../pages/Admin'
import { useHeight } from '../../hooks/useHeight'

const Render = () => {
    const filter = useSelector(state => state.ipPhone.filter)    
    const height = useHeight() - 60
    return(
      <div style={{backgroundColor: '#b9c9c9', height }}>             
        {
            (filter === "Search" || filter === "") &&
            <Search />
        }
        {
            (filter === "Admin") &&                    
            <Admin />
        }
      </div> 
  
    )
  
}

export default Render