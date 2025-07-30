import { 
    CategoryScale, 
    Chart as ChartJS, 
    Legend, 
    LinearScale, 
    LineElement, 
    PointElement, 
    TimeScale, 
    Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
const API_URL = import.meta.env.VITE_COIN_URL
import 'chartjs-adapter-date-fns'

ChartJS.register(
    CategoryScale, LineElement, PointElement, Tooltip, TimeScale, Legend, LinearScale
)

const CoinChart = ({CoinId}) => {
    const [chartData, setchartData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const fetchPrices = async() =>{
            const res = await fetch(`${API_URL}/${CoinId}/market_chart?vs_currency=usd&days=7`)

            const data = await res.json()            
            const prices = data.prices.map((price) =>({
                x : price[0],
                y: price[1]
            }));
            setchartData({
                datasets:[
                    {
                        label: 'Price (USD)',
                        data: prices,
                        fill: true,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0,123,255,0.1)', // Fixed the typo here
                        pointRadius: 0,
                        tension: 0.3,
                    }
                 ]
                })

                setLoading(false)
        }

        fetchPrices()
    }, [CoinId])

  return (
    <>
        <div style={{marginTop: '30px'}}>
            {chartData && ( // Add this conditional render
                <Line 
                 data={chartData}
                 options={
                    {
                        responsive: true,
                        plugins:{
                            legend:{display:false},
                            tooltip:{mode: 'index', intersect: false},
                        },
                        scales:{
                          x:  {
                                type: 'time',
                                time:{
                                    unit: 'day'
                                },
                                ticks:{
                                    autoSkip: true,
                                    maxTicksLimit: 7,
                                },
                            },

                          y: {
                             ticks:{
                                callback: (value) => `$${value.toLocaleString()}`
                             }
                           } 
                        }
                    }
                 }
                
                />
            )} {/* Close the conditional render */}
        </div>
    </>
  )
}

export default CoinChart