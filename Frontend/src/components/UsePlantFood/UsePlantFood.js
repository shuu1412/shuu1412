import React, { useEffect, useState } from 'react';
import './UsePlantFood.css';
import vip from '../../images/icon/vip.png'
import Modal from 'react-modal';
const {ethers, utils} = require('ethers');
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const plantvsZombieData = require('../../contract/plantVsZombieData');
// const vipIcon = require('../../images/icon/vip.png');
function UsePlantFood() {

    const plantVsZombiesNFTContract = new ethers.Contract(plantvsZombieData.address,plantvsZombieData.abi, provider);
    const plantDefault = {
        "name" : "",
        "suncost" : 0,
        "damage" : 0,
        "toughness" : 0,
        "recharge" : 0,
        "speed" : 0,
        "numberPlantFood" : 0,
        "isVip" : false,
        "tokenId" : "",
    }
    const [ plants, setPlants] = useState([]);
    const [ plant, setPlant] = useState(plantDefault);
    const [ selectTokenId, setSelectedTokenId] = useState();
    const [ updateProperties , setUpdateProperties] = useState([]);
    const [ account, setAccount] = useState("");
    const [ txhash, setTxhash] = useState("");
    const [ txtError, setTxtError] = useState("");
    const [ textAmount, setTexAmount] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const CheckInputRaido = async () => {
        const properties = document.querySelector('input[name="plant_properties"]:checked').value;
        console.log(properties);
        let propertiesArray = [false,false,false,false,false,false];
        propertiesArray[properties] = true;
        setUpdateProperties(propertiesArray);
    }

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
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = ethers.utils.getAddress(accounts[0]);
        console.log('featch');
        try {
            const resUser = await fetch(`http://localhost:3000/users/${account}`);
            console.log(resUser);
            const response = await fetch(`http://localhost:3000/users/${account}/plants`);
            console.log("featch 2222")
            const data = await response.json();
            console.log(data);  
            console.log("data" + data);
            setPlant(data[0]);
            setPlants(data);
        } catch (error) {
            setPlant(plantDefault);
            setPlants([]);   
        }

    }

    window.ethereum.on('accountsChanged', function (accounts) {
        fetchData();
        setAccount(accounts[0]);
    });
    

    useEffect(() => {
        fetchData();
    },[])

    useEffect( () => {
        for(let i = 0; i < plants.length; i++) {
            if(selectTokenId == plants[i].tokenId) {
                setPlant(plants[i]);
                break;
            }
        }

    },[selectTokenId])

    const getLink = (tokenId) => {
        let img = "000" + tokenId ;
        if( img.length > 4) {
            img = img.substring(1,5);
        }
        const res = plantvsZombieData.imgIPFS + '/' + img + ".png";
        return res;
    }

    const renderPlant = event => {
        console.log(plants);
        console.log(event.target.value);
        setSelectedTokenId(event.target.value);
    }

    const PreUsePlantFood = ()=> {
        if(plant.numberPlantFood == 0 ) {
            alert(`number eat plant food of ${plant.name} is 0`)
            return
        }
        try {
            const properties = document.querySelector('input[name="plant_properties"]:checked').value;
            openModal();
        } catch (error) {
            alert("please choose properties")
        }

    }

    const UsePlantFood = async () => {
        
        const properties = document.querySelector('input[name="plant_properties"]:checked').value;
        const signer =  provider.getSigner();
        const pvzWithSigner = plantVsZombiesNFTContract.connect(signer);
        try {
            setTexAmount("pending");
            const txn_test = await pvzWithSigner.usePlantFood(selectTokenId, properties);
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
            console.log(ans);
            setTexAmount("error");
            setTxtError(ans);
        }
    }


    return (
        <div className='UsePlantFood'>
            <div className='UsePlantFood-title'><p className='p-title'>Use Plant Food</p></div>
            <div className = 'UsePlantFood-content'>
                <div className='root-img'>
                    <img className='plant-img' src={getLink(plant.tokenId)}/>
                </div>
                <div className = 'PlantProperties'>
                    <div className='ul-plant'>
                        <div className='plant_name_content one_properties_plant'>
                            <div className='plantname_render number_fetch plant_name_use_pf'>{plant.name}</div>
                            <div>
                                {
                                    plant.isVip ? <img className='plant_is_vip_icon' src = {vip}/> : <div></div>
                                }
                            </div>
                        </div>
                        <div className='sun_cost_content one_properties_plant'>
                            <div className='li-plant plant_properties_of_use_pf'>SunCost: </div>
                            <div className='properties_render_use_pf number_fetch'>{plant.suncost}</div>
                            <div>
                                {
                                    updateProperties[1] ? 
                                    <div className='number_fetch_after_use_pf'> - 10 </div> : <div></div> 
                                }
                            </div>
                        </div>
                        <div className='one_properties_plant'>
                            <div className='li-plant plant_properties_of_use_pf '>Damage: </div>
                            <div className='properties_render_use_pf number_fetch'>{plant.damage}</div>
                            <div>
                                {
                                    updateProperties[2] ? 
                                    <div className='number_fetch_after_use_pf'> + 20</div> : <div></div> 
                                }
                            </div>
                        </div>
                        <div className='one_properties_plant'>
                            <div className='li-plant plant_properties_of_use_pf'>Toughness: </div>
                            <div className='properties_render_use_pf number_fetch'>{plant.toughness}</div>
                            <div>
                                {
                                    updateProperties[3] ? 
                                    <div className='number_fetch_after_use_pf'> + 100 </div> : <div></div> 
                                }
                            </div>

                        </div>
                       
                        <div className='one_properties_plant'>
                            <div className='li-plant plant_properties_of_use_pf'>Recharge: </div>
                            <div className='properties_render_use_pf number_fetch'>{plant.recharge}</div>
                            <div>
                                {
                                    updateProperties[4] ? 
                                    <div className='number_fetch_after_use_pf'> - 2</div> : <div></div> 
                                }
                            </div>
                        </div>
                        <div className='one_properties_plant'>
                            <div className='li-plant plant_properties_of_use_pf'>Speed: </div>
                            <div className='properties_render_use_pf number_fetch'>{plant.speed}</div>
                            <div>
                                {
                                    updateProperties[5] ? 
                                    <div className='number_fetch_after_use_pf'> + 1</div> : <div></div> 
                                }
                            </div>

                        </div>
                        <div className='one_properties_plant'>
                            <div className='li-plant plant_properties_of_use_pf'>Eat PlantFood: </div>
                            <div className='number_fetch'>{plant.numberPlantFood}</div>
                        </div>
                    </div>
                </div>
                <div className='selection-plant'>
                    <div className='choose-tokenId'>
                        <p className='choose-tokenId-title'></p>
                        <select name='combox_name_of_plant' className='select_plant' onChange={renderPlant}>
                            {
                                plants.map(((plant) => {
                                    return(
                                        <option className='select-option' value={plant.tokenId} > {plant.name}</option>
                                    )
                                }))
                            }
                        </select>
                    </div>
                    <form className='radio_button'>
                        <div className='thanh'>
                            <input type="radio" id="choose_properties" name="plant_properties" value="1" onClick={CheckInputRaido}/>
                            <label className='label' for="choose_properties">Decrement Suncost</label>
                        </div>
                        <div className='thanh'>
                            <input type="radio" id="choose_properties_2" name="plant_properties" value="2" onClick={CheckInputRaido}/>
                            <label className='label' for="choose_properties_2">Imcrement Damage</label>
                        </div >
                        <div className='thanh'>
                            <input type="radio" id="choose_properties_3" name="plant_properties" value="3" onClick={CheckInputRaido}/>
                            <label className='label' for="choose_properties_3">Imcrement Toughneer</label>
                        </div>
                        <div className='thanh'>
                            <input type="radio" id="choose_properties_4" name="plant_properties" value="4" onClick={CheckInputRaido}/>
                            <label className='label' for="choose_properties_4">Imcrement Recharge</label>
                        </div>
                        <div className='thanh'>
                            <input type="radio" id="choose_properties_5" name="plant_properties" value="5" onClick={CheckInputRaido}/>
                            <label className='label' for="choose_properties_5">Decrement Speed</label>
                        </div>
                    </form>
                    <button className ='usePlantFood button_g' onClick={PreUsePlantFood}>
                        Use Plant Food
                    </button>
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
                                    <div className='buybox_modal_header'>User Plant Food</div>
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
                                        <div className='text_question'> Are you sure User PlantFood for {plant.name} ?</div> :
                                        <div/>

                                    }
                                </div>
                                <div className='display_flex parent_buybox_header'>
                                    {
                                        textAmount ==="" ?
                                        <button onClick={UsePlantFood} className='button_on_modal yes_button'>Yes</button>
                                        :
                                        <div></div>
                                    }
                                    <button onClick={closeModal} className='button_on_modal close_button'>close</button>
                                </div>

                                <div></div>
                </Modal>
        </div>
    );
}

export default UsePlantFood;