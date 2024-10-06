import React from 'react';
import './PlantFoodDetail.css';
import torchwoodred from '../../images/Torchwood/TorchwoodRed.jpg';
import addicon from '../../images/add/add.jpg';
import plantfood from '../../images/plantFood/plantfood.jpg';
import equalicon from '../../images/equal/equal.jpg';
import torchwoodblue from '../../images/Torchwood/TorchwoodBlue.jpg';

function PlantFoodDetail() {
    return (
        <div className='Detail'>
            <div className='tiltle_detail'><p>Plant Food Detail</p></div>
            <div className='plantfood-example'>
                <img className='torchwood-red-img' src = {torchwoodred}></img>
                <img className='add-icon' src = {addicon}></img>
                <img className='plant-food' src = {plantfood}></img>
                <img className='equal-icon' src= {equalicon}></img>
                <img className='torchwood-blue-img 'src = {torchwoodblue}></img>
            </div>
        </div>
    );
}

export default PlantFoodDetail;