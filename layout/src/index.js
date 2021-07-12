'use strict';

import smoothscroll from './modules/smoothscroll';
import phoneDropdown from './modules/phoneDropdown';
import mobileMenu from './modules/mobileMenu';
import bodyListeners from './modules/bodylisteners';

import sendForm from './modules/sendForm';

// smooth scroll
smoothscroll(0.2);
phoneDropdown();
mobileMenu();
bodyListeners();