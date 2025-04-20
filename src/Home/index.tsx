import "../styles.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BiDrink } from "react-icons/bi";
import { IoMdStarOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

export default function Home() {
    return (
        <div className="home">
            <h1>Home</h1> <br />
            <h4>
                <BiDrink className="home-react-icons me-2"/>
                Drink of the Hour
            </h4>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button className="card-btn">See Recipe</Button>
                </Card.Body>
            </Card>

            <br/>

            <h4>
                <IoMdStarOutline className="home-react-icons me-2"/>
                Popular Drinks (if user is not logged in)
            </h4>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button variant="primary">See Recipe</Button>
                </Card.Body>
            </Card>

            <br/>

            <h4>
                <FaRegHeart className="home-react-icons me-2"/>
                Saved Drinks (if user is logged in)
            </h4>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button variant="primary">See Recipe</Button>
                </Card.Body>
            </Card>
        </div>
    )
}