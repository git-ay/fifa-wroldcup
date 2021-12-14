import React from "react";
import {Card} from "react-bootstrap";
import {Button} from "@material-ui/core";
import "./Box.css";

const MoreDeets = () => {
    const cardInfo = [
        {image: "https://cdn.dmcl.biz/media/image/197399/o/Ahmad+Bin+Ali+Stadium+GettyImages-1292391536.jpg", title:"Stay Here", text: "Home page"},
        {image: "https://static.euronews.com/articles/766401/1024x576_766401.jpg?1558600061", title:"Matches Page", text: "Find out who's the better team"},
        {image: "https://cdn.forbes.com.mx/2018/07/Qatar-2-e1532747410693-640x360.jpg", title:"Teams Page", text: "Learn more about your favorite WorldCup team and its players"},
        {image: "https://www.24newshd.tv/digital_images/large/2021-10-21/qatar-world-cup-final-venue-98-5-percent-complete-1634838914-1800.jpg", title:"Analysis Page", text: "Dive into the numbers"},

    ];

    const renderCard = (card,index) => {
        return (
            <Card style={{ width: '18rem' }} key={index} className="box">
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>
                        {card.text}
                    </Card.Text>
                    <Button variant="primary">SELECT</Button>
                </Card.Body>
            </Card>
        )
    }

    return <div className="grid">{cardInfo.map(renderCard)}</div>;

};

export default MoreDeets