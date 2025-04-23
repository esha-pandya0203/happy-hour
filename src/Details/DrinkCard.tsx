import { Button, Card } from "react-bootstrap";

const DrinkCard = ({ drink, onClick, page }: {
    drink: any; onClick?: () => void; page: string; 
}) => {
  return (
    <Card className={`saved-drinks-card-${page} d-flex flex-column h-100`}>
      <Card.Img variant="top" src={`${drink.strDrinkThumb}/small`} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{drink.strDrink}</Card.Title>
        <Card.Text className="flex-grow-1">
          {Array.from({ length: 15 }).map((_, i) => {
            const ingredient = drink[`strIngredient${i + 1}`];
            const measure = drink[`strMeasure${i + 1}`];
            return ingredient ? (
              <span key={i} className="d-block">{measure || ''} {ingredient}</span>
            ) : null;
          })}
        </Card.Text>
        <Button variant="primary" className="mt-auto" onClick={onClick}>
          See Recipe
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DrinkCard;
