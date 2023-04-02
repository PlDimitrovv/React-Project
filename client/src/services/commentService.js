const baseUrl = 'http://localhost:3030/data/comments';

export const getAllComments = async (recipeId) => {
    const query = encodeURIComponent(`recipeId="${recipeId}"`);
 
    const response = await fetch(`${baseUrl}?where=${query}`)
    const result = await response.json();
    console.log(result);
    return result

};

export const addComment = async (accessToken, data) => {
    console.log(accessToken);
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify(data)
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