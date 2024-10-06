import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import plantVsZombieData from './contract/plantVsZombieData';
import { publicRoutes, privateRoutes } from './routers/router.js';
import Header from './components/Header/Header';
const {ethers} = require('ethers');
const provider = new ethers.providers.Web3Provider(window.ethereum);
const plantvsZombieData = require('./contract/plantVsZombieData');
function App() {

	const [account, setAccount] = useState('');

	
	useEffect( () => {
		const fetchData = async () => {
			const accounts = await provider.send("eth_requestAccounts", []);
			const admin = ethers.utils.getAddress(accounts[0]);
			setAccount(admin);
			console.log(admin);
		}
		fetchData();
	},[])

	return (
		<Router>
			<div className="App">
				<Header/>
				<Routes>
					{
						account !== plantVsZombieData.addressOfAdmin ? 
						publicRoutes.map((route, index) => {
							const Layout = route.component
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout />
									}
								/>
							);
						}) :
						privateRoutes.map((route, index) => {
							const Layout = route.component
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout />
									}
								/>
							);
						})
					}
				</Routes>
			</div>	
		</Router>
	);
}

export default App;