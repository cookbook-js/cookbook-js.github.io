import { html, classMap } from '../lib.js';


export const spinner = () => html`<p>Loading &hellip;</p>`;

export const field = ({label, name, type = 'text', value = '', placeholder = '', error}) => {
    if (type == 'textarea') {
        html`<label class="ml">${label}: <textarea class=${classMap({ error })} name=${name} placeholder=${placeholder} .value=${value}></textarea></label>`;
    } else {
        return html`
        <label>${label}: <input class=${classMap({ error })} type=${type} name=${name} placeholder=${placeholder} .value=${value}></label>`;
    }
};