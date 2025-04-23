import "../styles.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BiDrink } from "react-icons/bi";
import { IoMdStarOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import DrinkCard from "../Details/DrinkCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadSavedDrinks } from "../utils/drinks";
import { Col, Row } from "react-bootstrap";
import * as drinksClient from "../clients/drinkClient";

export default function Home() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [savedDrinks, setSavedDrinks] = useState<any[]>([]);
    const [randomDrink, setRandomDrink] = useState<any>();
    const [popularDrinks, setPopularDrinks] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchSavedDrinks = async () => {
        if (currentUser?.savedDrinks?.length) {
            const result = await loadSavedDrinks(currentUser.savedDrinks);
            setSavedDrinks(result);
        }
    }

    const fetchRandomDrink = async () => {
        const result = await drinksClient.fetchRandomCocktail();
        setRandomDrink(result.drinks[0]);
    }

    const generatePopularDrinks = async () => {
        const drinks: any[] = [];

        for (let i = 0; i < 5; i++) {
            const result = await drinksClient.fetchRandomCocktail();
            drinks.push(result.drinks[0]);
        }

        setPopularDrinks(drinks);
    }


    useEffect(() => {
        fetchSavedDrinks();
        fetchRandomDrink();
        generatePopularDrinks(); 
    }, []);

    return (
        <div className="home">
            <h1>Home</h1> <br />

            {randomDrink && (
                <>
                    <h4>
                        <BiDrink className="home-react-icons me-2" />
                        Drink of the Hour
                    </h4>
                    <DrinkCard drink={randomDrink} onClick={() => navigate(`/drinks/${randomDrink.idDrink}`)} page="home" />
                </>
            )}

            <br />

            <h4>
                <IoMdStarOutline className="home-react-icons me-2" />
                Popular Drinks (if user is not logged in)
            </h4>
            <Row>
                {popularDrinks.map((drink) => (
                    <Col className="col-2">
                        <DrinkCard drink={drink} onClick={() => navigate(`/drinks/${randomDrink.idDrink}`)} page="home" />
                    </Col>
                ))}
            </Row>

            <br />

            {currentUser && (
                <>
                    <h4>
                        <FaRegHeart className="home-react-icons me-2" />
                        Saved Drinks
                    </h4>
                    <Row className="home-saved-drinks">
                        {savedDrinks.map((drink) => (
                            <Col className="col-2">
                                <DrinkCard drink={drink} onClick={() => navigate(`/drinks/${drink.idDrink}`)} page="home" />
                            </Col>
                        ))}
                    </Row>
                    {/* <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Drink Name</Card.Title>
                            <Card.Text>
                                Drink Ingredients
                            </Card.Text>
                            <Button variant="primary">See Recipe</Button>
                        </Card.Body>
                    </Card> */}
                </>
            )}

        </div>
    )
}