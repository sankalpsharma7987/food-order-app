import mealsData from "../../objects/mealsData";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  return (
    <section className={classes.meals}>
      <Card>
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
      </Card>
    </section>
  );
};

export default AvailableMeals;
