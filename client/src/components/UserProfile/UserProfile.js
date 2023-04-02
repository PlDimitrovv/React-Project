import { useEffect, useState, useContext } from "react";

import * as recipeService from '../../services/recipeService'
import { AuthContext } from '../../context/AuthContext'
import { OneRecipe } from '../OneRecipe/OneRecipe'

export const UserProfile = () => {

    const [userRecipes, setUserRecipes] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        recipeService.getUserRecipe(user._id)
            .then(recipes => setUserRecipes(recipes))

    }, [user._id])

    const hasRecipe = userRecipes.length > 0

    return (
        <section>

            <article className="info">
                <h1 className="banner-title">Welcome {user.username}</h1>
                <h3 className="banner-subtitle">to your profile page!</h3>
            </article>


            {hasRecipe && (
                <div className="wrapper">
                    {userRecipes.map(recipe =>
                        <OneRecipe recipe={recipe} key={recipe._id} />)}
                </div>
            )}

            {!hasRecipe && (
                <h2 className="catalog-not-submitted">Currently you have no submitted Recipes</h2>
            )}

        </section>
    )

}