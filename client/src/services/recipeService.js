const baseUrl = 'http://localhost:3030/data/recipes';


export const getAll = async () => {
    try {
        const response = await fetch(`${baseUrl}`);
        const result = await response.json();
        return result
    } catch (error) {
        return [];
    }
};


export const getOneRecipe = async (recipeId) => {
    const response = await fetch(`${baseUrl}/${recipeId}`);
    const result = await response.json();
    return result
};

export const getUserRecipe = async (_id) => {
    try {
        const response = await fetch(`${baseUrl}`);
        const result = await response.json();
        return result.filter(x => x._ownerId === _id)
    } catch (error) {
        return [];
    }
}


export const edit = async (recipe, accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/${recipe._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify(recipe)

        })
        const result = await response.json()

        if (response.ok) {
            return result
        } else {
            throw new Error(result.error)
        }
    } catch (error) {
        return error
    }

}


export const create = async (recipe, accessToken) => {

    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify(recipe)
        });
        const result = await response.json();
        if (response.ok) {
            return result
        } else {

            throw new Error(result.error);
        }
    } catch (error) {
        return error
    }
};

export const deleteRecipe = async (recipeId, accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/${recipeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": accessToken
            }
        })
        const result = await response.json()
        if (response.ok) {
            return result
        } else {
            throw new Error(result.error)
        }
    } catch (error) {
        return error
    }
}