import { OneRecipe } from "../OneRecipe/OneRecipe"
import { useEffect, useState } from "react"
import * as recipeService from '../../services/recipeService'

import './Catalog.css'

export const Catalog = () => {

    const [recipes, setRecipe] = useState([]);
    useEffect(() => {
        recipeService.getAll()
            .then(recipes => setRecipe(recipes))
    }, [])

    const hasRecipe = recipes.length > 0

    return (
        <section>
            <article className="info">
                <h1 className="banner-title">Explore delicious </h1>
                <h3 className="banner-subtitle">recipes for you!</h3>
            </article>
            <div className="wrapper">
                {recipes.map(recipe =>
                    <OneRecipe recipe={recipe} key={recipe._id} />)}
            </div>

            {!hasRecipe && (
                <h2>Currently there are no submitted Recipes</h2>
            )}
        </section>
    )
}