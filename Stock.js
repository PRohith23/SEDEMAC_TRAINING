import React from 'react'
import { Line } from 'react-chartjs-2'

class Stock extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            stockDate: [],
            stockOpen: [],
            stockHigh: [],
            stockLow: [],
            stockClose: [],
            stockVolume: [],
            loaded: false
        }
    }

    componentDidMount() {
        const API_KEY = '3UK02FMBCCXGZ0G3'
        let symbol = 'IBM'
        let apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`

        fetch(apiCall)
            .then((response) => response.json())

            .then((data) => {
                console.log(data)

                let stockDateFunction = []
                let stockOpenFunction = []
                let stockHighFunction = []
                let stockLowFunction = []
                let stockCloseFunction = []
                let stockVolumeFunction = []
                for (var key in data['Time Series (Daily)']) {
                    stockDateFunction.push(key)
                    stockOpenFunction.push(data['Time Series (Daily)'][key]['1. open'])
                    stockHighFunction.push(data['Time Series (Daily)'][key]['2. high'])
                    stockLowFunction.push(data['Time Series (Daily)'][key]['3. low'])
                    stockCloseFunction.push(data['Time Series (Daily)'][key]['4. close'])
                    stockVolumeFunction.push(data['Time Series (Daily)'][key]['5. volume'])
                }

                this.setState({
                    stockDate: stockDateFunction,
                    stockOpen: stockOpenFunction,
                    stockHigh: stockHighFunction,
                    stockLow: stockLowFunction,
                    stockClose: stockCloseFunction,
                    stockVolume: stockVolumeFunction,
                    loaded: true
                })
                
            })
    }
    
    render() {
        const { stockDate, stockOpen, stockHigh,
            stockLow, stockClose, stockVolume, loaded } = this.state
        console.log(stockDate)
        if (!loaded) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        return (
            <div>
                <Line 
                    data={{
                        datasets: [
                            {
                                type: 'line',
                                data: data
                            }
                        ]
                    }}
                />
            </div>
        )
    }
}

export default Stock