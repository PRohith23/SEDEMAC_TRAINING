import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
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
            presentGraph: []
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClickClose = this.handleClickClose.bind(this)
        this.handleClickHigh = this.handleClickHigh.bind(this)
        this.handleClickLow = this.handleClickLow.bind(this)
        this.handleClickVolume = this.handleClickVolume.bind(this)
    }

    componentDidMount() {
        const API_KEY = '3UK02FMBCCXGZ0G3'
        let symbol = 'AMZN'
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
                    presentGraph: stockOpenFunction
                })
                
            })
    }
    
    handleClickOpen() {
        this.setState(prevState => {
            return {
                stockOpen: prevState.stockOpen,
                stockClose: prevState.stockClose,
                stockHigh: prevState.stockHigh,
                stockLow: prevState.stockLow,
                stockVolume: prevState.stockVolume,
                presentGraph: prevState.stockOpen
            }
        })
    }

    handleClickClose() {
        this.setState(prevState => {
            return {
                stockOpen: prevState.stockOpen,
                stockClose: prevState.stockClose,
                stockHigh: prevState.stockHigh,
                stockLow: prevState.stockLow,
                stockVolume: prevState.stockVolume,
                presentGraph: prevState.stockClose
            }
        })
    }

    handleClickHigh() {
        this.setState(prevState => {
            return {
                stockOpen: prevState.stockOpen,
                stockClose: prevState.stockClose,
                stockHigh: prevState.stockHigh,
                stockLow: prevState.stockLow,
                stockVolume: prevState.stockVolume,
                presentGraph: prevState.stockHigh
            }
        })
    }

    handleClickLow() {
        this.setState(prevState => {
            return {
                stockOpen: prevState.stockOpen,
                stockClose: prevState.stockClose,
                stockHigh: prevState.stockHigh,
                stockLow: prevState.stockLow,
                stockVolume: prevState.stockVolume,
                presentGraph: prevState.stockLow
            }
        })
    }

    handleClickVolume() {
        this.setState(prevState => {
            return {
                stockOpen: prevState.stockOpen,
                stockClose: prevState.stockClose,
                stockHigh: prevState.stockHigh,
                stockLow: prevState.stockLow,
                stockVolume: prevState.stockVolume,
                presentGraph: prevState.stockVolume
            }
        })
    }
    render() {
        const STATE = {
            labels: this.state.stockDate,
            datasets: [
                {
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.presentGraph
                }
            ]
        }
        return (
            <div>
                <button onClick={this.handleClickOpen}>Stock Open Price</button>
                <button onClick={this.handleClickClose}>Stock Close Price</button>
                <button onClick={this.handleClickHigh}>Stock High Price</button>
                <button onClick={this.handleClickLow}>Stock Low Price</button>
                <button onClick={this.handleClickVolume}>Stocks Volume</button>
                <Line
                    data={STATE}
                    options={{
                        title: {
                            display: true,
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }}
                />
            </div>
        )
    }
}

export default Stock
