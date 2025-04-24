import { useEffect, useState } from "react";
import * as drinksClient from "../clients/drinkClient";
import DrinkDetails from "./DrinkDetails";
import { useParams } from "react-router-dom";

export default function IndividualDrink () {
    const params = useParams();
    const [drinkInQuestion, setDrinkInQuestion] = useState<any>();

    const fetchDrinkInfo = async () => {
        const result = await drinksClient.fetchById(params.drinkId);
        setDrinkInQuestion(result.drinks[0]);
    }

    useEffect(() => { fetchDrinkInfo(); }, []);

    return (
        <div>
            <h1>Individual Drink Details</h1><hr />
            {drinkInQuestion && <DrinkDetails drink={drinkInQuestion} />}
        </div>
    )
}