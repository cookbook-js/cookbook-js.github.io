import { getRecipes } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { createSubmitHandler, parseQuery } from '../util.js';
import { spinner } from './common.js';


const catalogTemplate = (recipePromise, onSearch, page = 1, search = '') => html`
<section id="catalog">
    <div class="section-title">
        <form @submit=${onSearch} id="searchForm">
            <input type="text" name="search" .value=${search}>
            <input type="submit" value="Search">
        </form>
    </div>

    <header class="section-title">
        Page 2 of 3
        <a class="pager" href="/catalog/1">&lt; Prev</a>
        <a class="pager" href="/catalog/3">Next &gt;</a>
    </header>

    ${until(recipePromise, spinner())}

    <footer class="section-title">
        Page 2 of 3
        <a class="pager" href="/catalog/1">&lt; Prev</a>
        <a class="pager" href="/catalog/3">Next &gt;</a>
    </footer>

</section>`;

const recipePreview = (recipe) => html`
<a class="card" href="/details/${recipe.objectId}">
    <article class="preview">
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small"><img src=${recipe.img}></div>
    </article>
</a>`;

export function catalogPage(ctx) {
    const { page, search } = parseQuery(ctx.querystring);

    ctx.render(catalogTemplate(loadRecipes(page, search), createSubmitHandler(onSearch, 'search'), page, search));

    function onSearch({ search }) {
        if (search) {
            ctx.page.redirect(`/catalog?search=${encodeURIComponent(search)}`);
        } else {
            ctx.page.redirect('/catalog');
        }
    }
}

async function loadRecipes(page = 1, search = '') {
    const { results: recipes } = await getRecipes(page, search);

    if (recipes.length == 0) {
        return html`<p>No recipes found. Be the first to post a recipe!</p>`;
    } else {
        return recipes.map(recipePreview);
    }
}