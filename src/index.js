import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './Components/AppNavbar/AppNavbar'
import AccueilPage from './Pages/AccueilPage/AccueilPage'
import AddPage from './Pages/AddPage/AddPage'
import UpdatePage from './Pages/UpdatePage/UpdatePage'
import StatistiquesPage from './Pages/StatistiquesPage/StatistiquesPage'
import CarnetPage from './Pages/CarnetPage/CarnetPage'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<header>
				<AppNavbar />
			</header>
			<Routes>
				<Route path="/" element={<AccueilPage />} />
				<Route path="/stats" element={<StatistiquesPage />} />
				<Route path="/carnet" element={<CarnetPage />} />
				<Route path="/carnet/add" element={<AddPage />} />
				<Route path="/carnet/update:indice" element={<UpdatePage />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
