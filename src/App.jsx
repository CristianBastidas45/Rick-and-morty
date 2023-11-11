import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import InfoLocation from './components/InfoLocation'
import CardResident from './components/CardResident'

function App() {
  const [locationId, setLocationId] = useState(Math.floor(Math.random() * 126)+1)

  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [location,getLocation,isLoading,hasError] = useFetch(url)

  useEffect(()=>{
    getLocation()
  },[locationId])

  const inputLocation = useRef()

  const handleLocation = e =>{
    e.preventDefault()
    console.log(inputLocation.current.value);
    setLocationId(inputLocation.current.value.trim()) 
  }

  return (
    <div className='app'>
      {/* <h1 className='app__title'>Rick and Morty</h1> */}
      <img src="./header.png" alt="header" className='app__img'/>
      <form className='app__form' onSubmit={handleLocation}>
        <input className='app__input' ref={inputLocation} type="text" />
        <button className='app__btn'>Search</button>
      </form>
      {
        isLoading
        ?<img src='./ram-portal.png' className="loading" alt="loading" />
        :(
          hasError || locationId === '0' || locationId === ''
          ?<h2 className='id__no__found'>Hey! you must provide an id from 1 to 126 </h2>
          :(
            <>
              <InfoLocation 
                location ={location}
              />
              <div className='app__card-container'>
                {
                  location?.residents.map(url => (
                    <CardResident 
                    key={url}
                    url = {url}
                    />
                  ))
                }
              </div>
            </>
          )
        )
      }
    </div>
  )
}

export default App
