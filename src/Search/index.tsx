import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import * as drinksClient from "../clients/drinkClient";
import DrinkCard from "../Details/DrinkCard";

export default function Search() {
    // const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [searchDrinks, setSearchDrinks] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<any>();
    const navigate = useNavigate();

    const fetchByCocktailName = async (cocktail: any) => {
        console.log()
        const result = await drinksClient.fetchByCocktailName(cocktail);
        setSearchDrinks(result.drinks);
    }

    // const fetchIngredient = async (ingredient: any) => {
    //     console.log(ingredient)
    //     const result = await drinksClient.fetchByIngredientName(ingredient);
    //     setSearchDrinks(result.ingredients);
    // }

    return (
        <div className="search">
            <h1>Search</h1>
            <InputGroup className="float-start w-50 me-2">
                <InputGroup.Text id="search-icon" className="fs-5">
                    <HiMagnifyingGlass />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search..." 
                              onChange={(e) => {setSearchValue(e.target.value); console.log(searchValue)}}/>
                <Button onClick={() => (fetchByCocktailName(searchValue))} variant="primary">Search Cocktails</Button>
                {/* <Button onClick={() => (fetchIngredient(searchValue))} variant="secondary">By Ingredient</Button> */}
            </InputGroup>
            <br /><br /><hr />
            <Row>
                {searchDrinks.map((drink) => 
                    (<Col className="col-3">
                        <DrinkCard drink={drink} onClick={() => navigate(`/drinks/${drink.idDrink}`)} page="search" />
                    </Col>))}
            </Row>
        </div>
    ); 
}