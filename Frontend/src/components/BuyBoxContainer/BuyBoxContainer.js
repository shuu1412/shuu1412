import React, { useState, useEffect } from 'react';
import './BuyBoxContainer.css';
import box from '../../images/box/box.jpg';
import boxvip from '../../images/box/boxvip.jpg';
import Modal from 'react-modal';

const { ethereum } = window;
const contract = require('../../fetchData/contract.js');
const fetch = require('node-fetch');
const ethers = require('ethers');
const plantvsZombieData = require('../../contract/plantVsZombieData');
const pvzCoinData = require('../../contract/pvzCoinData');
const provider = new ethers.providers.Web3Provider(window.ethereum);

function BuyBoxContainer() {

    const plantVsZombiesNFTContract = new ethers.Contract(plantvsZombieData.address,plantvsZombieData.abi, provider);
    const plantVSZombiesCoinContract = new ethers.Contract(pvzCoinData.address, pvzCoinData.abi, provider);

    const [ amountBoxBuy, setAmountBoxBuy] = useState(1);
    const [ amountBoxVipBuy, setamountBoxVipBuy ] = useState(1);
    const [ remainingBox, setRemainingBox] = useState(0);
    const [ remainingBoxVip, setRemainingBoxVip] = useState(0);
    const [ priceOfBox, setPriceOfBox] = useState(1);
    const [ priceOfBoxVip, setPriceOfBoxVip] = useState(1);
    const [ totalPiceBox, setTotalPriceBox ] = useState(1);
    const [ totalPriceboxVip, setTotalPriceBoxVip] = useState(1);
    const [ ableBuyBoxVip, setAbleBuyBoxVip] = useState(false);
    const [ textAmount, setTexAmount] = useState("");
    const [ txhash, setTxhash] = useState("");
    const [ txtError, setTxtError] = useState("");

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenVip, setIsOpenVip] = React.useState(false);

    function openModal() {
        setTexAmount("");
        setIsOpen(true);
    }
    
    function openModalVip() {
        setTexAmount("");
        setIsOpenVip(true); 
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setTexAmount("");
        setIsOpen(false);
        setIsOpenVip(false);
        fetchData();
    }

    const fetchData = async ()=> {
        const response = await fetch('http://localhost:3000/contracts');
        const data = await response.json();
        setRemainingBox(data.amountBox);
        setRemainingBoxVip(data.amountBoxVip);
        setPriceOfBox(data.priceOfBox);
        setPriceOfBoxVip(data.priceOfBoxVip);
        setAbleBuyBoxVip(data.ableBuyBoxVip);
    }

    useEffect(() => {
        window.ethereum.on('accountsChanged', function (accounts) {
			fetchData();
		})
        fetchData();
    },[]);  

    useEffect(() => {
        setTotalPriceBox(amountBoxBuy * priceOfBox);
    }, [amountBoxBuy, priceOfBox])

    useEffect(() => {
        setTotalPriceBoxVip(amountBoxVipBuy *priceOfBoxVip);
    }, [amountBoxVipBuy, priceOfBoxVip])

    const ImcrementAmountBox = () => {
        if(amountBoxBuy < 10)
            setAmountBoxBuy(amountBoxBuy + 1);
    }
    
    const DeimcrementAmountBox = () => {
        if(amountBoxBuy > 1)
            setAmountBoxBuy(amountBoxBuy - 1);
    }

    const ImcrementAmountBoxVip = () => {
        if(amountBoxVipBuy < 10)
            setamountBoxVipBuy(amountBoxVipBuy + 1);
    }

    const DeimcrementAmountBoxVip = () => {
        if(amountBoxVipBuy > 1)
            setamountBoxVipBuy(amountBoxVipBuy - 1);
    }

    const BuyBox = async () => {
        const signer =  provider.getSigner();
        const signer2 = provider.getSigner();
        const pvzCoinWithSigner = plantVSZombiesCoinContract.connect(signer);
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer2);
        try {
            setTexAmount("pending");
            const tx1 = await pvzCoinWithSigner.approve(plantvsZombieData.address, totalPiceBox);
            const txn_test = await pvzWithSigner.buyBox(false, amountBoxBuy);
            const haha = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash)
                    clearInterval(haha);
                }
            },5000)
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32);
            setTexAmount("error");
            setTxtError(ans);
        }

    }

    const BuyBoxVip = async () => {
        const signer =  provider.getSigner();
        const pvzCoinWithSigner =  plantVSZombiesCoinContract.connect(signer);
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            setTexAmount("pending");
            const tx1 =  await pvzCoinWithSigner.approve(plantvsZombieData.address, totalPriceboxVip );
            const txn_test = await pvzWithSigner.buyBox(true, amountBoxVipBuy);
            // const tx1 = await pvzCoinWithSigner.approve(plantvsZombieData.address, totalPiceBox);
            // const txn_test = await pvzWithSigner.buyBox(false, amountBoxBuy);
            const haha = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(haha);
                }
            },5000)
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32);
            setTexAmount("error");
            setTxtError(ans);
        }
        // const tx1 =  pvzCoinWithSigner.approve(plantvsZombieData.address, totalPriceboxVip );
        // pvzWithSigner.buyBox(true, amountBoxVipBuy);
    }
    return (
        <div className='buyBoxContainer'>
            <div className='background'></div>
            <div className='buyBoxContent'>
                <div className='box'>
                    <img className='imgbox' src = {box}></img>
                    <div className='content-box'>
                        <div className='title-box'>Box</div>
                        <ul className='box_infomation_buy_box'>
                            <div className='box-info'>
                                <div className='remaining_container'>
                                    <div className='remaining text_not_fetch'>Remaining: </div>
                                    <div className='number_remaining number_fetch'>{remainingBox}</div>
                                </div>
                                <div className='price_one_box_container'>
                                    <div className='text_not_fetch price_on_box'>Price:</div>
                                    <div className ='number_fetch price_box_fetch'> {priceOfBox} </div>
                                    <div className='text_not_fetch'>PvZCoin</div>
                                </div>
                            </div>
                            <div className='box-info-butom'>
                                <div className='amount-buy text_not_fetch'>Amount Buy</div>
                                <div className='input-amount-buy'>
                                    <button className='deImcrement' onClick={DeimcrementAmountBox}>-</button>
                                    <div className='numberAmountBoxBuy number_fetch'>{amountBoxBuy}</div>
                                    <button className='imcrement' onClick={ImcrementAmountBox}>+</button>
                                </div>
                                <div className='price_of_box'>
                                    <div className='text_not_fetch price_of_box_title'>Total Price: </div>
                                    <div className='number_fetch totalprice_fetch'>{totalPiceBox}</div>
                                    <div className='text_not_fetch'> PvZCoin</div>
                                </div>
                            </div>
                        </ul>
                        <div className='buttonBuyBox' onClick={openModal}>Buy Box</div>
                    </div>
                </div>
                <div className='boxvip'>
                    <img className='imgboxvip' src = {boxvip}></img>    
                    <div className='content-boxvip'>
                        <div className='title_and_button'>
                            <div className='title-boxvip'>BoxVip</div>
                        </div>
                        <ul className='box_infomation_buy_box'>
                            <div className='box-info'>
                                <div className='remaining_container'>
                                    <div className='remaining text_not_fetch'>Remaining: </div>
                                    <div className='number_remaining number_fetch'>{remainingBoxVip}</div>
                                </div>
                                <div className='price_one_box_container'>
                                    <div className='text_not_fetch price_on_box'>Price:</div>
                                    <div className ='number_fetch price_box_fetch'> {priceOfBoxVip} </div>
                                    <div className='text_not_fetch'>PvZCoin</div>
                                </div>
                            </div>
                            <div className='box-info-butom'>
                                <div className='amount-buy text_not_fetch'>Amount Buy</div>
                                <div className='input-amount-buy'>
                                    <button className='deImcrement' onClick={DeimcrementAmountBoxVip}>-</button>
                                    <div className='numberAmountBoxBuy number_fetch'>{amountBoxVipBuy}</div>
                                    <button className='imcrement' onClick={ImcrementAmountBoxVip}>+</button>
                                </div>
                                <div className='price_of_box'>
                                    <div className='text_not_fetch price_of_box_title'>Total Price: </div>
                                    <div className='number_fetch totalprice_fetch'>{totalPriceboxVip}</div>
                                    <div className='text_not_fetch'> PvZCoin</div>
                                </div>
                            </div>
                        </ul>
                        <div>
                            {
                                ableBuyBoxVip ? <div className='buttonBuyBoxVip' onClick={openModalVip}>Buy Box Vip</div> : 
                                <div ></div>
                            }
                        </div>
                        
                    </div>
                </div>
                <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                className='modal_of_box'
                                contentLabel="Example Modal"
                                >
                                <div className='display_flex parent_buybox_header'>
                                    <div className='buybox_modal_header'>Buy Box</div>
                                </div>
                                <div className='pending_container'>
                                        {
                                            textAmount ==="pending" ? 
                                            <div className='text_question text_pending'>Pending ...</div>
                                            :
                                            <div></div>
                                        }
                                </div>
                                <div className='error_container'>
                                        {
                                            textAmount ==="error" ? 
                                            <div className=''>
                                                <div className='error_container'>
                                                    <div className='text_question text_error'>Error!! </div>
                                                </div>
                                                <div className=''>{txtError}</div>
                                            </div>
                                            :
                                            <div></div>
                                        }

                                </div>
                                <div className='success_container'>
                                        {
                                            textAmount ==="success" ? 
                                            <div>
                                                <div className='success_container'>
                                                    <div className='text_question text_Success'>Success </div>
                                                </div>
                                                <div className=''>{txhash}</div>
                                            </div>

                                            :
                                            <div></div>
                                        }

                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    {
                                        textAmount ==="" ?
                                        <div className='text_question'> Are you sure to buy {amountBoxBuy} Box ?</div> :
                                        <div/>

                                    }
                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    {
                                        textAmount ==="" ?
                                        <button onClick={BuyBox} className='button_on_modal yes_button'>Yes</button>
                                        :
                                        <div></div>
                                    }
                                    <button onClick={closeModal} className='button_on_modal close_button'>close</button>
                                </div>

                                <div></div>
                </Modal>
                <Modal
                                isOpen={modalIsOpenVip}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                className='modal_of_box'
                                contentLabel="Example Modal"
                                >
                                <div className='display_flex parent_buybox_header'>
                                    <div className='buybox_modal_header'>Buy Box Vip</div>
                                </div>
                                <div className='pending_container'>
                                        {
                                            textAmount ==="pending" ? 
                                            <div className='text_question text_pending'>Pending ...</div>
                                            :
                                            <div></div>
                                        }
                                </div>
                                <div className='error_container'>
                                        {
                                            textAmount ==="error" ? 
                                            <div className=''>
                                                <div className='error_container'>
                                                    <div className='text_question text_error'>Error!! </div>
                                                </div>
                                                <div className=''>{txtError}</div>
                                            </div>
                                            :
                                            <div></div>
                                        }

                                </div>
                                <div className='success_container'>
                                        {
                                            textAmount ==="success" ? 
                                            <div>
                                                <div className='success_container'>
                                                    <div className='text_question text_Success'>Success </div>
                                                </div>
                                                <div className=''>{txhash}</div>
                                            </div>

                                            :
                                            <div></div>
                                        }

                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    {
                                        textAmount ==="" ?
                                        <div className='text_question'> Are you sure to buy {amountBoxVipBuy} Box Vip?</div> :
                                        <div/>

                                    }
                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    {
                                        textAmount ==="" ?
                                        <button onClick={BuyBoxVip} className='button_on_modal yes_button'>Yes</button>
                                        :
                                        <div></div>
                                    }
                                    <button onClick={closeModal} className='button_on_modal close_button'>close</button>
                                </div>

                                <div></div>
                </Modal>
            </div>
        </div>
    );
}

export default BuyBoxContainer;