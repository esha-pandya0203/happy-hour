const DrinkDetails = ({ drink }: { drink: any }) => {
  return (
    <div>
        <h2>{drink.strDrink} ({drink.strAlcoholic})</h2>
        <img src={`${drink.strDrinkThumb}/small`} /><hr />
        <p>
            <b>{drink.strIBA}</b>
            <hr />
            <b>Glass:</b> {drink.strGlass}
            <hr />
            <b>Ingrdients:</b> <br />
            {Array.from({ length: 15 }).map((_, i) => {
                const ingredient = drink[`strIngredient${i + 1}`];
                const measure = drink[`strMeasure${i + 1}`];
                return ingredient ? (
                    <span key={i} className="d-block">{measure || ''} {ingredient}</span>
                ) : null;
            })}
            <hr />
            <b>Instructions:</b><br />
            {drink.strInstructions}
            <hr />
        </p>
    </div>
  );
};

export default DrinkDetails;
