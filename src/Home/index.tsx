import "../styles.css";
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
    const under21 = currentUser ? currentUser.role == "under21" : false;
    const [nonAlcoholic, setNonAlcholic] = useState<any>();
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

    const fetchNonAlcoholicDrink = async () => {
        const result = await drinksClient.fetchByCocktailName("Spanish chocolate");
        setNonAlcholic(result.drinks[0]);
    }

    const generatePopularDrinks = async () => {
        const drinks: any[] = [];

        if (under21) {
            let result = await drinksClient.fetchByCocktailName("Afterglow");
            drinks.push(result.drinks[0]);
            result = await drinksClient.fetchByCocktailName("Frappé");
            drinks.push(result.drinks[0]);
            result = await drinksClient.fetchByCocktailName("Lassi - Mango");
            drinks.push(result.drinks[0]);
            result = await drinksClient.fetchByCocktailName("Limeade");
            drinks.push(result.drinks[0]);
            result = await drinksClient.fetchByCocktailName("Strawberry Shivers");
            drinks.push(result.drinks[0]);
            // for (let i = 0; i < 5; i++) {
            //     let result = await drinksClient.fetchNonAlcoholic();
            //     drinks.push(result.drinks[getRandomInt(58)]);
            // }
        } else {
            for (let i = 0; i < 5; i++) {
                let result = await drinksClient.fetchRandomCocktail();
                drinks.push(result.drinks[0]);
            }
        }

        setPopularDrinks(drinks);
    }


    useEffect(() => {
        fetchSavedDrinks();
        fetchRandomDrink();
        fetchNonAlcoholicDrink();
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
                    <DrinkCard drink={under21 ? nonAlcoholic : randomDrink} onClick={() => under21 ? navigate(`/drinks/${nonAlcoholic.idDrink}`) : navigate(`/drinks/${randomDrink.idDrink}`)} page="home" />
                </>
            )}

            <br />

            <h4>
                <IoMdStarOutline className="home-react-icons me-2" />
                Popular Drinks
            </h4>
            <Row>
                {popularDrinks.map((drink) => (
                    <Col className="col-2">
                        <DrinkCard drink={drink} onClick={() => navigate(`/drinks/${drink.idDrink}`)} page="home" />
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