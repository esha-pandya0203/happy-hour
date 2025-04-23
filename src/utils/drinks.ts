import * as drinksClient from "../clients/drinkClient";

export const loadSavedDrinks = async (drinkIds: string[]) => {
  if (!drinkIds.length) return [];

  const drinkPromises = drinkIds.map((id: string) =>
    drinksClient.fetchById(id).then((res) => {
      return res.drinks?.[0];
    })
  );

  const drinks = await Promise.all(drinkPromises);
  return drinks.filter(Boolean);
};
