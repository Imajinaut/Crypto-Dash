import React from 'react'
import Coincard from '../components/Coincard'
import LimitSelector from '../components/LimitSelector'
import FilterInput from '../components/FilterInput'
import SortSelector from '../components/SortSelector'
import Spinner from '../components/Spinner'

const Homepage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setsortBy,
    loading,
    error
    }) => {

            const filteredCoins =  coins.filter((coin)=>{
      return coin.name.toLowerCase().includes(filter.toLowerCase())  || coin.symbol.toLowerCase().includes(filter.toLowerCase())
  })
  .slice()
  .sort((a,b) =>{
    switch (sortBy) {
      case 'market_cap_desc':
         return b.market_cap - a.market_cap;
      case 'market_cap_asc':
         return a.market_cap - b.market_cap;
      case 'price_desc':
         return b.current_price - a.current_price;
      case 'price_asc':
         return a.current_price - b.current_price;
      case 'change_desc':
         return b.price_change_percentage_24h - a.price_change_percentage_24h;
      case 'change_asc':
         return a.price_change_percentage_24h - b.price_change_percentage_24h;
      break;
    }
  } )


  return (
    <>
         <div>
      <h2>Crpto Dash</h2>
      {loading && <Spinner color='white'/>}
      {error && <div className='error'>{error} </div> }
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter}/>
        <LimitSelector onLimitChange={setLimit} limit={limit}/>
        <SortSelector sortBy={sortBy} onSortChange={setsortBy}/>
      </div>
      {
        !loading && !error && (
          <main className="grid">
            { filteredCoins.length > 0 ?
              filteredCoins.map((coin)=>(
                <Coincard key={coin.id} coin={coin}/>
              )) : (<p>No matching coin</p>
              )
            }
          </main>
        )
      }
    </div>
    </>
  )
}

export default Homepage