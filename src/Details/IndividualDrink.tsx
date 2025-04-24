import { useEffect, useState } from "react";
import * as drinksClient from "../clients/drinkClient";
import DrinkDetails from "./DrinkDetails";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IndividualDrink () {
    const params = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [drinkInQuestion, setDrinkInQuestion] = useState<any>();

    const fetchDrinkInfo = async () => {
        const result = await drinksClient.fetchById(params.drinkId);
        setDrinkInQuestion(result.drinks[0]);
    }

    useEffect(() => { fetchDrinkInfo(); }, []);

    return (
        <div>
            <h1>Individual Drink Details</h1><hr />
            {currentUser ? drinkInQuestion && <DrinkDetails drink={drinkInQuestion} />
                         : <div>
                            <h2>Sign-in to view drink details!</h2>
                            <Link to="/signin" className="btn btn-secondary w-25 mb-2">Sign In</Link>
                           </div>}
        </div>
    )
}