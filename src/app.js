import { page } from './lib.js';
import decorateContext from './middlewares/render.js';
import addSession from './middlewares/session.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';

page(addSession());
page(decorateContext());
page('/', homePage);
page('/login', loginPage);

page.start();