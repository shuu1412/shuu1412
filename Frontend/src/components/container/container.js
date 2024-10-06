import React from 'react';
import './container.css'
import zombie from './zombie.jpg';
import footer from '../../images/footer/footer2.png';

const Container = () => (
    <div>
        <div className='container'> </div>
        <div className = 'content-container'>
            <div className='content'>
                <h1 className='h1-text'>
                    Plants Vs Zombies NFT
                </h1>
                <span className='h3-text'>Plants vs. Zombies NFT is a video game franchise developed by PopCap Games, a subsidiary of Electronic Arts (EA) </span>
                <div className='button_container'>
                    <a className='button-play button_g' href='https://play.google.com/store/apps/details?id=com.ea.game.pvz2_row&hl=vi&gl=US' >Play</a>
                    <a className='button-explore button_w' href='https://www.ea.com/ea-studios/popcap/plants-vs-zombies' >Explore</a>
                </div>
            </div>
            <div className='footer'>
                <img className='img' src={zombie}/>
            </div>
        </div>
        <img className='img-footer' src={footer}/>
    </div>
)

export default Container;