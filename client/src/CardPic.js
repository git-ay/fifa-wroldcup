import React from 'react';
import './CardPic.css'

function CardPic({title, imageUrl,body,team}) {
    return (
        <div className='card-container'>
            <div className= "image-container" align="center">
                <img src={imageUrl+team+".jpg"} alt='' />
            </div>
            <div className= "card-content">
                <div className="card-title" align="center" >
                    <h4 > {team} </h4>
                </div>

            </div>

        </div>
    );
}

export default CardPic;

