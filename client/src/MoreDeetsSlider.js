import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {Button} from "@material-ui/core";
import "./BoxSlider.css";
import logo from './images/logo3.jpg'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const photos = [
    {
        name: 'Photo1',
        url: 'https://e0.365dm.com/21/03/768x432/skysports-pa-england-world-cup-qualifier_5324217.jpg?20210330165406'
    },
    {
        name: 'Photo2',
        url: 'https://www.vbetnews.com/wp-content/uploads/2021/03/neymar.jpg'
    },
    {
        name: 'Photo3',
        url: 'https://images.hindustantimes.com/img/2021/10/12/550x309/germany-wcq-getty_1634026088160_1634026100905.jpg'
    },
]
class MoreDeetsSlider extends Component{
    render() {
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            arrows: true,
            slidesToScroll:1,
            className: "slides"
        }

        return(
            <div className="MoreDeetsSlider" style={{padding:24}}>
                <Slider {...settings}>
                    {photos.map((photo) => {
                        return(
                                <div>
                                    <img width="100%" src={photo.url}/>
                                </div>
                        )
                    })}
                </Slider>
            </div>
        )
    }
}

export default MoreDeetsSlider;