import React, { useEffect, useState } from 'react';
import './PlantFoodDemo.css';
import plantfood_img from '../../images/plantFood/plantfood.jpg';
import Modal from 'react-modal';
const fetch = require('node-fetch');
const ethers = require('ethers');
const plantvsZombieData = require('../../contract/plantVsZombieData');
const pvzCoinData = require('../../contract/pvzCoinData');
const provider = new ethers.providers.Web3Provider(window.ethereum);

function PlantFoodDemo() {

    const plantVsZombiesNFTContract = new ethers.Contract(plantvsZombieData.address,plantvsZombieData.abi, provider);
    const plantVSZombiesCoinContract = new ethers.Contract(pvzCoinData.address, pvzCoinData.abi, provider);

    const [ remaining, setRemaining] = useState(1);
    const [ priceOfOne, setPriceOfOne] = useState(0);
    const [ amountBuyPlantFood, setAmountBuyPlantFood] = useState(1);
    const [ totalPriceBuy, setTotalPriceBuy] = useState(0);
    const [ textAmount, setTexAmount] = useState("");
    const [ txhash, setTxhash] = useState("");
    const [ txtError, setTxtError] = useState("");

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setTexAmount("");
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setTexAmount("");
        setIsOpen(false);

        fetchData();
    }

    const fetchData = async ()=> {
        const response = await fetch('http://localhost:3000/contracts');
        const data = await response.json();
        setRemaining(data.amountPlantFood);
        setPriceOfOne(data.priceOfPlantFood);
    }
    fetchData();
    useEffect( () => {
    },[])

    useEffect( () => {
        setTotalPriceBuy( priceOfOne * amountBuyPlantFood);
    },[amountBuyPlantFood, priceOfOne])


    const DeIcrementAmountPlantFood = async () => {
        if(amountBuyPlantFood > 1)
            setAmountBuyPlantFood(amountBuyPlantFood - 1);
    }
    const ImcrementAmountPlantFood = async () => {
        if(amountBuyPlantFood < 10)
            setAmountBuyPlantFood(amountBuyPlantFood + 1)
    }

    const BuyPlantFood = async () => {
        const signer =  provider.getSigner();
        const pvzCoinWithSigner =  plantVSZombiesCoinContract.connect(signer);
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);

        try {
            setTexAmount("pending");
            await pvzCoinWithSigner.approve(plantvsZombieData.address, totalPriceBuy);
            const txn_test = await pvzWithSigner.buyPlantFood(amountBuyPlantFood);
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
    return (
        <div className='PlantFoodDemo'> 
            <div className='Container'> 
                <div className='Container-content'>
                    <div className='PlantFood-text'>    
                        <div className='plantfood-title'>Plant Food</div>
                        <div className='plantfood-detail'>Plant Food is packed with vitamins and minerals. It's an essential part of a complete breakfast.</div>
                        <div className=''>
                            <div className='plantfood_content'>
                                <div className='remaining_plant_food'>
                                    <div className='remaining_amount'>
                                        <div className='remaining_plant_food_title'>Remaining: </div>
                                        <div className='remaining_plant_food_number number_fetch' >{remaining}</div>
                                    </div>
                                    <div className='price_of_one_plantfood'>
                                        <div className='Price_one_plant_food text_not_fetch'>Price:</div>
                                        <div className='number_fetch'>{priceOfOne}</div>
                                    </div>
                                </div>
                            <div className=''></div>
                                <div className='box-info-butom plantfood_input_buy'>
                                    <div className='amount_buy text_not_fetch'>Amount Buy: </div>
                                    <div className='input-amount-plantFood'>
                                        <button className='deImcrement_plantFood' onClick={DeIcrementAmountPlantFood} >-</button>
                                        <div className='numberAmountBoxBuy'>{amountBuyPlantFood}</div>
                                        <button className='imcrement_plantFood' onClick={ImcrementAmountPlantFood}>+</button>
                                    </div>
                                    <div className='total_price_buy'>
                                        <div className='total_price_content'>
                                            <div className='price-of-plantfood text_not_fetch'>Total Price: </div>
                                            <div className='number_fetch'> {totalPriceBuy}</div>
                                        </div>
                                        <div className='donvi text_not_fetch'> PvZCoin</div>
                                    </div>
                                </div>
                        </div>
                        <div>
                            <button className='buyPlantFood button_g' onClick={openModal}>Buy Plant Food</button>
                        </div>
                        </div>
                    </div>
                    <img className='imgPlantFood' src={plantfood_img}></img>
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
                                        <div className='text_question'> Are you sure to buy {amountBuyPlantFood} PlantFood ?</div> :
                                        <div/>

                                    }
                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    {
                                        textAmount ==="" ?
                                        <button onClick={BuyPlantFood} className='button_on_modal yes_button'>Yes</button>
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

export default PlantFoodDemo;