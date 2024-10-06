import React, { useEffect, useState } from 'react';
import './Admin.css'
import {ethers, Contract} from "ethers";
import Modal from 'react-modal';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const plantvsZombieData = require('../../contract/plantVsZombieData');

function Admin() {

    const plantVsZombiesNFTContract = new ethers.Contract(plantvsZombieData.address,plantvsZombieData.abi, provider);

    const [ paused, setPaused] = useState(false);
    const [ amountBox, setAmountBox] = useState(0);
    const [ amountBoxVip, setAmountBoxVip] = useState(0);
    const [ amountPlantFood, setAmountPlantFood] = useState(0);
    const [ priceOfBox, setPriceOfBox] = useState(0);
    const [ priceOfBoxVip, setPriceOfBoxVip] = useState(0);
    const [ priceOfPlantFood ,setPriceOfPlantFood] = useState(0);
    const [ addressOfCoinUse ,setAddressOfCoinUse] = useState();
    const [ addressOfBoxContract, setAddresOfBoxContract] = useState();
    const [ ableBuyBoxVip, setAbleBuyBoxVip] = useState(false);
    const [ txhash, setTxhash] = useState("");
    const [ txtError, setTxtError] = useState("");
    const [ textAmount, setTexAmount] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const AbleBuyBoxVip = async ()=> {
        openModal();
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.ableBuyBoxVip();
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    }
    

    const UnAbleBuyBoxVip = async ()=> {
        openModal();
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = pvzWithSigner.unableBuyBoxVip();
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
        
    }

    const Pause = async() => {
        openModal();
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.pause();
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    }

    const UnPause = async() => {
        openModal();
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.unpause();
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    }

    const ImcrementBox = async() => {
        openModal();
        const amount = document.getElementById('imcremetnbox').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.imcrementBox(amount);
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    }

    const ImcrementBoxVip = () => {
        openModal();
        const amount = document.getElementById('imcremetnboxVip').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        pvzWithSigner.imcrementBoxVip(amount);
    }

    const ImcrementPlantFood = async() => {
        openModal();
        const amount = document.getElementById('imcrementPlantFood').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.imcrementPlantFood(amount);
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    }

    const SetPriceOfBox = async () => {
        openModal();
        const amount = document.getElementById('setPriceOfBox').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.setPriceOfBox(amount);
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    
    }

    const SetPriceOfBoxVip = async() => {
        openModal();
        const amount = document.getElementById('setPriceOfBoxVip').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.setPriceOfBoxVip(amount);
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
        
    }

    const SetPriceOfPlantFood = async() => {
        openModal();
        const amount = document.getElementById('setPircePlantFood').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            const txn_test = await pvzWithSigner.setPriceOfPlantFood(amount);
            const setInterVal = setInterval(async function() {
                const txReceipt = await provider.getTransactionReceipt(txn_test.hash);
                console.log("setInterval");
                if (txReceipt && txReceipt.blockNumber) {
                    setTexAmount("success");
                    setTxhash(txn_test.hash);
                    clearInterval(setInterVal);
                }
            },5000)
            
        } catch (error) {
            const err = error.toString();
            const ans = err.substring(7,32); 
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
        
    }

    const SetAddressCoinUse = () => {
        const address = document.getElementById('setAddressCoinUse').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        pvzWithSigner.setAddressOfCoinUse(address);
    }

    const SetAddressOfBox = () => {
        const address = document.getElementById('setAddressOfBox').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        pvzWithSigner.setAddressOfBox(address);
        

    }

    function openModal() {
        setTexAmount("pending");
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setTexAmount("");
        setIsOpen(false);
        fetchData();
    }

    const fetchData = async ()=> {
        const response = await fetch('http://localhost:3000/contracts');
        const data = await response.json();
        setAmountBox(data.amountBox);
        setAmountBoxVip(data.amountBoxVip);
        setAmountPlantFood(data.amountPlantFood);
        setPriceOfBox(data.priceOfBox);
        setPriceOfBoxVip(data.priceOfBoxVip);
        setPriceOfPlantFood(data.priceOfPlantFood);
        setAddresOfBoxContract(data.addressOfBoxContract);
        setAddressOfCoinUse(data.addressOfCoinUse);
        setAbleBuyBoxVip(data.ableBuyBoxVip);
        setPaused(data.paused);
    }
    useEffect(() => {
        fetchData();
    },[]);  


    return (
        <div>
            <div className='parent'>
                <div className='AdminContainer'>
                    <div className='admin-title'>PlantsVsZombies Manage</div>
                    <div>
                        <div className='contract_info_container'>
                            <div className='group_pause_and_able groupadmin'>
                                <div className='contract_info_one_admin pauseContract_and_ableBuyBoxVip'>
                                    <div className='text_not_fetch one_info_in_admin'>Paused :</div>
                                    <div className='number_fetch'> { paused ? "True" : "False"}  </div>
                                </div>
                                <div className='contract_info_one_admin pauseContract_and_ableBuyBoxVip '>
                                    <div className='text_not_fetch one_info_in_admin'>AbleBuyBoxVip :</div>
                                    <div className='number_fetch'> { ableBuyBoxVip ? "True" : "False"}  </div>
                                </div>
                                
                            </div>


                            <div className='group_amount groupadmin'>
                                <div className='contract_info_one_admin'>
                                    <div className='text_not_fetch one_info_in_admin'>Amount Box :</div>
                                    <div className='number_fetch'>{amountBox}</div>
                                </div>
                                <div className='contract_info_one_admin'>
                                    <div className='text_not_fetch one_info_in_admin'>Amount BoxVip :</div>
                                    <div className='number_fetch'>{amountBoxVip}</div>
                                </div>
                                <div className='contract_info_one_admin'>
                                    <div className='text_not_fetch one_info_in_admin'>Amount PlantFood :</div>
                                    <div className='number_fetch'>{amountPlantFood}</div>
                                </div>
                            </div>
                            <div className='group_price groupadmin'>
                                <div className='contract_info_one_admin'>
                                    <div className='text_not_fetch one_info_in_admin'>Price Of Box :</div>
                                    <div className='number_fetch'>{priceOfBox}</div>
                                </div>
                                <div className='contract_info_one_admin'>
                                    <div className='text_not_fetch one_info_in_admin'>Price Of BoxVip :</div>
                                    <div className='number_fetch'>{priceOfBoxVip}</div>
                                </div>
                                <div className='contract_info_one_admin'>
                                    <div className='text_not_fetch one_info_in_admin'>Price Of PlantFood :</div>
                                    <div className='number_fetch one_info_in_admin'>{priceOfPlantFood}</div>
                                </div>
                            </div>
                        </div >
                        <div className = 'button-notinput'>
                            {
                                !paused ?
                                <div className='pause'>
                                    <button className='buttona pause button_g' onClick={Pause}>Pause</button>
                                </div> :
                                <div className='unpause'>
                                    <button className='buttona unpause button_g' onClick={UnPause}>UnPause</button>
                                </div>
                            }
                            {
                                !ableBuyBoxVip ?
                                <div className='ableboxVip'>
                                    <button className = 'buttona ableboxVip button_g' onClick={AbleBuyBoxVip}>Able Buy BoxVip</button>
                                </div>
                                :
                                <div className='ubleboxVip'>
                                    <button className = 'buttona unaleboxVip button_g' onClick={UnAbleBuyBoxVip} >UnableBoxVip</button>
                                </div>
                            }
                        </div>
                        <div className = 'parent_button_noinput'>

                        <div className='button-input'>
                            <div className='button-input-son ImcrementBox'>
                                    <div>
                                        <input type="text" id="imcremetnbox" className='input incrementbox' placeholder="Amount"/>
                                    </div>
                                    <button className='buttonz imcrementBox button_g' onClick={ImcrementBox}>Imcrement Box</button>
                            </div>

                            <div className='button-input-son ImcrementBoxVip'>
                                    <div>
                                        <input type="text" id="imcremetnboxVip" className='input incrementboxvip' placeholder="Amount"/>
                                    </div>
                                    <button className='buttonz imcrementBoxVip button_g'  onClick={ImcrementBoxVip}>Imcrement BoxVip</button>
                            </div>

                            <div className='button-input-son ImcrementPlantFood'>
                                    <div>
                                        <input type="text" id="imcrementPlantFood" className='input incrementplantfood' placeholder="Amount"/>
                                    </div>
                                    <button className='buttonz imcrementBoxVip button_g' onClick={ImcrementPlantFood}>Imcrement PlantFood</button>
                            </div>
                           
                        </div>
                        <div>
                            {
                                paused ?
                                <div>
                                    <div className='button-input-son setPriceOfBox'>
                                            <div>
                                                <input type="text" id="setPriceOfBox" className='input setpriceofbox' placeholder="Amount"/>
                                            </div>
                                            <button className='buttonz button_g' onClick={SetPriceOfBox}>Set Price Of Box</button>
                                    </div>

                                    <div className='button-input-son setPriceOfBoxVip'>
                                            <div>
                                                <input type="text" id="setPriceOfBoxVip" className='input setpriceofboxvip' placeholder="Amount"/>
                                            </div>
                                            <button className='buttonz button_g' onClick={SetPriceOfBoxVip}>Set Price Of BoxVip</button>
                                    </div>
                                

                                    <div className='button-input-son setPircePlantFood'>
                                            <div>
                                                <input type="text" id="setPircePlantFood" className='input incrementplantfood' placeholder="Amount"/>
                                            </div>
                                            <button className='buttonz button_g' onClick={SetPriceOfPlantFood}>Set Price Of PlatFood</button>
                                    </div>
                                </div> : <div/>
                            }  
                        </div>
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
                                    <div className='buybox_modal_header'>Transaction</div>
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
                                        <div className='text_question'> Are you sure UnBox ?</div> :
                                        <div/>

                                    }
                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    <button onClick={closeModal} className='button_on_modal close_button'>close</button>
                                </div>

                                <div></div>
                </Modal>
            </div>
        </div>
    );
}

export default Admin;