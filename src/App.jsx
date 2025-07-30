import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import Header from './components/Header'
import Notfound from './pages/Notfound'
import { Coins } from './pages/Coins'
const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')
  const [sortBy, setsortBy] = useState("market_cap_desc")
  useEffect (()=>{
    // using async await with try -catch in useeffect to make api call
    const fetchCoins = async () =>{
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`)
        if(!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json()    
        setCoins(data)
        
      } catch (error) {
        setError(error.message)
      }finally{
        setLoading(false)
      }
    }

    fetchCoins()

// using .then for fetching api in useffect
    // fetch(API_URL)
    // .then((res)=>{
    //   if(!res.ok) throw new Error("Failed to fetch data");
    //     return res.json()
    // })
    // .then((data)=>{
    //     console.log(data);
    //     setCoins(data)
    //     setLoading(false)
    // })
    // .catch((err)=>{
    //   setError(err.message)
    //   setLoading(false)
    // });
  }, [limit]);

 

  return (
    <>
    {/* always make sure the not found page is the last route */}
    <Header/>
   <Routes>
    <Route path='/' element={<Homepage coins={coins} filter={filter} setFilter={setFilter} limit={limit} setLimit={setLimit} sortBy={sortBy} setsortBy={setsortBy} loading={loading} error={error}/>} />
    <Route path='/about' element={<AboutPage/>}/>
    <Route path='/coin/:id' element={<Coins/>}/>
    <Route path='*' element={<Notfound/>}/>
   </Routes>
    </>
  )
}

export default App
