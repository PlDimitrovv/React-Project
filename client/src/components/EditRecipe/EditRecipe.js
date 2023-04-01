import * as recipeService from "../../services/recipeService"

import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EditRecipe.css"

import { AuthContext } from '../../context/AuthContext';

export const EditRecipe = () => {

    const [recipe, setRecipe] = useState({
        name: "",
        img: "",
        desc: "",
        instructions: "",
        ingredients: "",
        servings: "",
        prepTime: "",
    })

    const [errors, setErrors] = useState({
        name: false,
        img: false,
        desc: false,
        instructions: false,
        ingredients: false,
        servings: false,
        prepTime: false,
        errorFromServer: false,
    })

    const navigate = useNavigate()

    const { recipeId } = useParams()

    const { user } = useContext(AuthContext)



    useEffect(() => {
        recipeService.getOneRecipe(recipeId)
            .then(result => {
                setRecipe(result)
            })
    }, [recipeId])


    const editRecipeHandler = async (e) => {
        e.preventDefault()
        if (Object.values(recipe).some(x => x === "") || Object.values(errors).some(x => x === true)) {
            setErrors(state => ({ ...state, "errorFromServer": 'All fields must be filled!' }))
            return
        }
        const response = await recipeService.edit(recipe, user.accessToken)

        if (response?._id) {
            navigate(`/catalog`)
        }

        if (response?.message) {
            return setErrors(state => ({ ...state, "errorFromServer": 'All Fields Must be filled!' }))
        }

    }



    const onErrorHandler = (e) => {
        if (e.target.name === 'name' && (e.target.value.length < 3 || e.target.value.length > 40)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === 'img') {
            const imgRegex = /^https?:\/\/./
            if (!e.target.value.match(imgRegex)) {
                setErrors(state => ({ ...state, [e.target.name]: true }))
            }
        } else if (e.target.name === 'desc' && (e.target.value.length < 3 || e.target.value.length > 200)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === "instructions" && (e.target.value.length < 3 || e.target.value.length > 200)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === "ingredients" && (e.target.value.length < 3 || e.target.value.length > 200)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === "servings" && (Number(e.target.value) < 0 || Number(e.target.value) > 50 || e.target.value === "")) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === "prepTime" && (Number(e.target.value) < 5 || Number(e.target.value) > 1440)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        }
    }

    const addRecipeData = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
        setErrors(state => ({ ...state, [e.target.name]: false, "errorFromServer": false }));
    }

    return (
        <div className="create-wrapper">
            <h1 className="create-title">Add Your Recipe</h1>
            <form className="form" onSubmit={editRecipeHandler}>
                {errors.errorFromServer && (
                    < h2 className="error"> {errors.errorFromServer}</h2>
                )}

                <label htmlFor="" className="form-label">Recipe Name</label>
                <input
                    type="text"
                    className="name"
                    name="name"
                    placeholder="Name your recipe"
                    value={recipe.name}
                    onChange={addRecipeData}
                    onBlur={onErrorHandler}
                />

                {errors.name && (
                    <p className='error-message'>
                        Name must be between 3 and 40 characters!
                    </p>
                )}


                <label htmlFor="" className="form-label">Recipe Image</label>
                <input
                    type="text"
                    className="img"
                    name="img"
                    placeholder="Https://"
                    value={recipe.img}
                    onChange={addRecipeData}
                    onBlur={onErrorHandler}
                />

                {errors.img && (
                    <p className='error-message'>
                        Invalid image URL!
                    </p>
                )}

                <label htmlFor="" className="form-label">Recipe Description</label>
                <textarea
                    type="text"
                    className="desc"
                    name="desc"
                    placeholder="Recipe Description"
                    value={recipe.desc}
                    onChange={addRecipeData}
                    onBlur={onErrorHandler}
                />

                {errors.desc && (
                    <p className='error-message'>
                        Description must be between 3 and 200 characters!
                    </p>
                )}


                <label htmlFor="" className="form-label">Instructions</label>
                <textarea
                    type="text"
                    className="instructions"
                    name="instructions"
                    placeholder="Recipe Instructions"
                    value={recipe.instructions}
                    onChange={addRecipeData}
                    onBlur={onErrorHandler}
                />

                {errors.instructions && (
                    <p className='error-message'>
                        Instructions must be between 2 and 200 characters!
                    </p>
                )}

                <label htmlFor="" className="form-label">Ingredients</label>
                <input
                    type="text"
                    className="ingredients"
                    name="ingredients"
                    placeholder="Separate Ingredients with ','"
                    value={recipe.ingredients}
                    onChange={addRecipeData}
                    onBlur={onErrorHandler}
                />

                {errors.ingredients && (
                    <p className='error-message'>
                        Ingredients must be between 3 and 200 characters!
                    </p>
                )}

                <div className="servings-prepTime-wrapper">
                    <label htmlFor="" className="form-label">Servings</label>
                    <input
                        type="number"
                        className="servings"
                        name="servings"
                        value={recipe.servings}
                        onChange={addRecipeData}
                        onBlur={onErrorHandler}
                    />

                    <label htmlFor="" className="form-label">Prep Time</label>
                    <input
                        type="number"
                        className="prepTime"
                        name="prepTime"
                        value={recipe.prepTime}
                        onChange={addRecipeData}
                        onBlur={onErrorHandler}
                    />

                </div>
                <div className="add-recipe-error-wrapper">
                    {errors.servings && (
                        <p className='error-message'>
                            Servings must be between 1 and 50!
                        </p>
                    )}
                    {errors.prepTime && (
                        <p className='error-message'>
                            Preparation time must be between 5 and 1440 minutes!
                        </p>
                    )}
                </div>

                <input type="submit" className="create-sbt" value="Submit" />
            </form>
        </div>
    )
}