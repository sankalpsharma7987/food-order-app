import React from "react";
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

const Header = (props)=>{

    return (
        <React.Fragment>

            <header className = {classes.header}>

                <h1> Food Order App </h1>
                <HeaderCartButton/>

            </header>
            
            {/* main-image is mentioned in quotes as the . notatition cannot be used for class name with a - */}

            <div className = {classes['main-image']}> 

                <img src = {mealsImage} alt='A table full of food'/>

            </div>

        </React.Fragment>
    )

}

export default Header;