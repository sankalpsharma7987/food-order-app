import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { sendRequest } = useHttp();

  const transformData = (responseData) => {
    try {
      if (!responseData) {
        throw Error();
      }

      const fetchedData = [];

      for (const key in responseData) {
        fetchedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setMealsData(fetchedData);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    try {
      sendRequest(
        {
          url: `https://react-food-ord-default-rtdb.firebaseio.com/meals.json`,
        },
        transformData
      );
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [sendRequest]);

  let content = (
    <React.Fragment>
      <ul>
        {mealsData.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            description={meal.description}
            price={meal.price}
            name={meal.name}
          />
        ))}
      </ul>
    </React.Fragment>
  );

  let isLoadingContent = <p className={classes.loading}> Loading...</p>;
  let errorContent = isError && (
    <p className={classes.error}>
      Could not fetch menu items at this time. Please try again later
    </p>
  );

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && isLoadingContent}
        {isError ? errorContent : content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
