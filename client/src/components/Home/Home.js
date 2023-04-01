import "./Home.css"
import { OneRecipe } from "../OneRecipe/OneRecipe"
import { useEffect, useState } from "react"

import * as recipeService from '../../services/recipeService'

export const Home = () => {
    const [recipes, setRecipe] = useState([]);
    useEffect(() => {
        recipeService.getAll()
            .then(recipes => setRecipe(recipes))
    }, [])

    const hasRecipe = recipes.length > 0






    return (
        <div>
            <div className="img-home" />
            <div className="home-wrapper">
                <p className="home-text">Explore</p>
                <p className="home-text">Make</p>
                <p className="home-text">Enjoy!</p>
            </div>
            <article className="info">
                <h1 className="banner-title">See some of our</h1>
                <h3 className="banner-subtitle">meals for you!</h3>
            </article>
            {hasRecipe && (

                <div className="wrapper">
                    {recipes.slice(-3).map(recipe =>
                        <OneRecipe recipe={recipe} key={recipe._id} />)}
                </div>
            )}

            {!hasRecipe && (
                <h2 className="not-submitted">Currently there are no submitted Recipes</h2>
            )}
        </div>
    )
}