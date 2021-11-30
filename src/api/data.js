import { getUserData } from '../util.js';


const pageSize = 5;

export const endpoints = {
    recent: '/classes/Recipe?limit=3',
    recipes: (page) => `/classes/Recipe?skip=${(page - 1) * pageSize}&limit=${pageSize}`,
    recipeSearch: (page, query) => `/classes/Recipe?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}`,
    recipeDetails: (id) => `/classes/Recipe/${id}?include=owner`,
    createRecipe: '/classes/Recipe',
    recipeById: '/classes/Recipe/',
    comments: '/classes/Comment',
    commentsByRecipe: (recipeId) => `/classes/Comment?where=${createPointerQuery('recipe', 'Recipe', recipeId)}&include=owner&order=-createdAt`
};

export function createPointerQuery(propName, className, objectId) {
    return createQuery({[propName]: createPointer(className, objectId)});
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}

export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

export function addOwner(record) {
    const { id } = getUserData();
    record.owner = createPointer('_User', id);

    return record;
}