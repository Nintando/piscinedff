import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './Components/AppNavbar/AppNavbar'
import AccueilPage from './Pages/AccueilPage/AccueilPage'
import AddPage from './Pages/AddPage/AddPage'
import UpdatePage from './Pages/UpdatePage/UpdatePage'
import PrevNotePage from './Pages/PrevisualisationNote/PrevNote'
import CarnetPage from './Pages/CarnetPage/CarnetPage'
import ConfigGlobal from './Pages/Global/ConfigGlobal'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<header>
				<AppNavbar />
			</header>
			<Routes>
				<Route index element={<AccueilPage />} />
				<Route path="/config" element={<ConfigGlobal />} />

				<Route path="/carnet/:group" element={<Outlet />}>
					<Route index element={<CarnetPage />} />
					<Route path="add" element={<AddPage />} />
					<Route path="update-:indice" element={<UpdatePage />} />
				</Route>
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
