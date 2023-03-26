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
    const response = await fetch(`${baseUrl}/recipes/${recipeId}`);
    const result = await response.json();
    return result
};


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