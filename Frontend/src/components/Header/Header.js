import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dataHeader } from "./dataHeader.js";
import "./Header.css";
import logo from "./logo.jpg";
import ethers from "ethers";
const { ethereum } = window;


const Header = () => {
	let { pathname } = useLocation();
	const [ connectSuccess, setConnectSucess] = useState(false);
	const [ address, setAdress] = useState("");
	const [ status, setStatus] = useState();
	useEffect( ()=> {
		
		const fetchData = async ()=> {
            const response = await fetch('http://localhost:3000/contracts');
            const data = await response.json();
			setStatus(data.paused);
        }
        fetchData();
	})

	useEffect( () => {
		window.ethereum.on('accountsChanged', function (accounts) {
			const preAddress = ` ${accounts[0].slice(0,5)} ... ${accounts[0].slice(-4)} `;
			setAdress(preAddress.toLocaleUpperCase());
			setConnectSucess(true);
		})
	})

	const connect = async () => {
		if (typeof window.ethereum !== "undefined") {
			try {
				await ethereum.request({ method: "eth_requestAccounts" });
			} catch (error) {
				console.log(error);
			}
			const accounts = await ethereum.request({ method: "eth_accounts" });
			const preAddress = ` ${accounts[0].slice(0,5)} ... ${accounts[0].slice(-4)} `;
			
			setAdress(preAddress);
			console.log(address)
			setConnectSucess(true);
			
		} else {
			console.log("Please install MetaMask");
		}
	};

	return (
		<div className="header">
			<img className="logo" src={logo} alt="logo" />
			<div className="parent_status">
					{
						status ? (
							<div className="display_flex status_of_contract_parent">
								<div className="status_contract status_true"/> 
								<div className="status_header">
									bad
								</div>
							</div>): 
							( 
							<div className="display_flex status_of_contract_parent">
								 <div className="status_contract status_false"/>
								 <div className="status_header">
									good
								</div>
							</div>
							)
						
					}
			</div>
			<div className="header_status_and_router">
				
				<ul className="ul-header">
					{dataHeader.map((item, index) => (
						//<li className='li-title'>{item.title}</li>
						<li key={index} className="li-title">
							<Link
								to={item.linkPage}
								className={`link-title ${pathname === item.linkPage ? "active" : ""
									}`}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="connect-web3">
				{
					address === "" ?
					(
						<button className="button-connect" onClick={() => {connect();}}>
						Connect
						</button>
					)
					:
					(
						<div className="addressAccount">
						{
							connectSuccess && (
								<div className="addressText">
									{address}
								</div>
							)
						}
						</div>
					)
				}
			</div>
		</div>
	);
};
export default Header;
