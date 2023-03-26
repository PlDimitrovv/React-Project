import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as recipeService from "../../services/recipeService"

import { AuthContext } from "../../context/AuthContext"

import "./AddRecipe.css"

export const AddRecipe = () => {

    const [recipeData, setRecipeData] = useState({
        name: "",
        img: "",
        desc: "",
        instructions: "",
        servings: "",
        prepTime: "",
    })

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)



    const createRecipeHandler = async (e) => {
        e.preventDefault()

        const response = await recipeService.create(recipeData, user.accessToken)

        if (response?._id) {
            navigate(`/catalog`)
        }

    }


    const addRecipeData = (e) => {
        setRecipeData({ ...recipeData, [e.target.name]: e.target.value })
    }

    return (
        <div className="create-wrapper">
            <h1 className="create-title">Add Your Recipe</h1>
            <form className="form" onSubmit={createRecipeHandler}>
                <label htmlFor="" className="form-label">Recipe Name</label>
                <input
                    type="text"
                    className="name"
                    name="name"
                    placeholder="Name your recipe"
                    value={recipeData.name}
                    onChange={addRecipeData}

                />

                <label htmlFor="" className="form-label">Recipe Image</label>
                <input
                    type="text"
                    className="img"
                    name="img"
                    placeholder="Https://"
                    value={recipeData.img}
                    onChange={addRecipeData}

                />

                <label htmlFor="" className="form-label">Recipe Description</label>
                <textarea
                    type="text"
                    className="desc"
                    name="desc"
                    placeholder="Recipe Description"
                    value={recipeData.desc}
                    onChange={addRecipeData}
                />

                <label htmlFor="" className="form-label">Instructions</label>
                <textarea
                    type="text"
                    className="instructions"
                    name="instructions"
                    placeholder="Recipe Instructions"
                    value={recipeData.instructions}
                    onChange={addRecipeData}
                />

                <label htmlFor="" className="form-label">Ingredients</label>
                <input
                    type="text"
                    className="ingredients"
                    name="ingredients"
                    placeholder="Separate Ingredients with ','"
                    value={recipeData.ingredients}
                    onChange={addRecipeData}
                />

                <div className="servings-prepTime-wrapper">
                    <label htmlFor="" className="form-label">Servings</label>
                    <input
                        type="number"
                        className="servings"
                        name="servings"
                        value={recipeData.servings}
                        onChange={addRecipeData}
                    />

                    <label htmlFor="" className="form-label">Prep Time</label>
                    <input
                        type="number"
                        className="prepTime"
                        name="prepTime"
                        value={recipeData.prepTime}
                        onChange={addRecipeData}
                    />

                </div>


                <input type="submit" className="create-sbt" value="Submit" />
            </form>
        </div>
    )
}