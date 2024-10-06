import React, { useState, useEffect } from 'react';
import suncost_icon from '../../images/icon/suncost.png';
import damage_icon from '../../images/icon/damage.png';
import plantfood_icon from '../../images/icon/plantfood.png';
import recharge_icon from '../../images/icon/recharge.png';
import speed_icon from '../../images/icon/speed.png';
import toughness_icon from '../../images/icon/toughness.png';
import vip_icon from '../../images/icon/vip.png';
import './Account.css';
const { ethereum } = window;
const {ethers, utils} = require('ethers');
const provider = new ethers.providers.Web3Provider(window.ethereum);
const plantvsZombieData = require('../../contract/plantVsZombieData');


function Account() {

    const [ plants, setPlants] = useState([]);
    const [ amountPlantFood, setAmountPlantFood] = useState(0);
    const [ amountBox, setAmountBox] = useState(0);
    const [ amountBoxVip, setAmountBoxVip ] = useState(0);
    const [ amountPlant, setAmountPlant] = useState(0);
    const [account, setAccount] = useState("");

    window.ethereum.on('accountsChanged', function (accounts) {
        fetchData();
        setAccount(accounts[0]);
    });

    const fetchData = async ()=> {
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = ethers.utils.getAddress(accounts[0]);
        const response = await fetch(`http://localhost:3000/users/${account}`);
        const responsePlants = await fetch(`http://localhost:3000/users/${account}/plants`);
        const data = await response.json();
        const plantsOfUser = await responsePlants.json();
        setAmountPlantFood(data.amountPlantFood);            
        setAmountBox(data.amountBox);
        setAmountBoxVip(data.amountBoxVip);
        setAmountPlant(data.plants.length);
        setPlants(plantsOfUser);
    }

    useEffect(() => {
        
        fetchData();
    },[]);
    

    const getLink = (tokenId) => {
        let img = "000" + tokenId ;
        if( img.length > 4) {
            img = img.substring(1,5);
        }
        const res = plantvsZombieData.imgIPFS + '/' + img + ".png";
        return res;
    }
    
    return (
        <div className='Account-container'>
            <div className='account_and_plants'>
                <div className='my_account'>
                    <div className='My_Account_header'>
                        My Account
                    </div>
                    <div className='plantfood_info_account'>
                        <div className='text_not_fetch marign_for_text'>PlantFood :</div>
                        <div className='number_fetch'>{amountPlantFood}</div>
                    </div>
                    <div className='plantfood_info_account'>
                        <div className='text_not_fetch marign_for_text'>Amount Box :</div>
                        <div className='number_fetch'>{amountBox}</div>
                    </div>
                    <div className='plantfood_info_account'>
                        <div className='text_not_fetch marign_for_text'>Amount BoxVip :</div>
                        <div className='number_fetch'>{amountBoxVip}</div>
                    </div>
                    <div className='plantfood_info_account'>
                        <div className='text_not_fetch marign_for_text'>Amount Plants :</div>
                        <div className='number_fetch'>{amountPlant}</div>
                    </div>
                </div>
                <div className='My-Plants'>
                    <div className='my_plants_header'> My Plants</div>
                    <div className='my_plants_container'>
                        {
                            plants.map((plant) => {
                                return(
                                    <div className='a_plant'>
                                        <div className='parent_imgOfOnePlant'>
                                            <img className='imgOfOnePlant' src={getLink(plant.tokenId)}/>
                                        </div>
                                        <div className='multi_properties'>
                                            <div className='plant_name_title'>
                                                <div className='number_fetch'>{plant.name}</div>
                                               
                                            </div>
                                            <div className='display_flex two_propertiesPlant_of_user'>
                                                <div className='a_propertiesPlant_of_user'>
                                                    <img className='icon_suncost icon_of_plant' src={suncost_icon}/>
                                                    <div>
                                                        <div className=''>SunCost</div>
                                                        <div className='number_fetch'>{plant.suncost}</div>
                                                    </div>
                                                </div>
                                                <div className='a_propertiesPlant_of_user'>
                                                    <img className='icon_damage icon_of_plant' src={damage_icon}/>
                                                    <div>
                                                        <div className=''>Damage</div>
                                                        <div className='number_fetch'>{plant.damage}</div>
                                                    </div>
                                                    <div className='plant_vip_account'>
                                                    {
                                                        plant.isVip ? 
                                                        <img className='icon_vip_account' src={vip_icon}/> :
                                                        <div></div>
                                                    }
                                                </div>
                                                </div>
                                            </div>
                                            <div className='display_flex two_propertiesPlant_of_user'>
                                                <div className='a_propertiesPlant_of_user'>
                                                    <img className='icon_toughness icon_of_plant' src={toughness_icon}/>
                                                    <div>
                                                        <div className=''>Toughness</div>
                                                        <div className='number_fetch'>{plant.toughness}</div>
                                                    </div>
                                                </div>
                                                <div className='a_propertiesPlant_of_user'>
                                                    <img className='icon_toughness icon_of_plant' src={recharge_icon}/>
                                                    <div>
                                                        <div className=''>Recharge</div>
                                                        <div className='number_fetch'>{plant.recharge}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='display_flex two_propertiesPlant_of_user'>
                                                <div className='a_propertiesPlant_of_user'>
                                                    <img className='icon_toughness icon_of_plant' src={speed_icon}/>
                                                    <div>
                                                        <div className=''>Speed</div>
                                                        <div className='number_fetch'>{plant.speed}</div>
                                                    </div>
                                                </div>
                                                <div className='a_propertiesPlant_of_user'>
                                                    <img className='icon_toughness icon_of_plant' src={plantfood_icon}/>
                                                    <div>
                                                        <div className=''>Number Plant Food :</div>
                                                        <div className='number_fetch'>{plant.numberPlantFood}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Account;