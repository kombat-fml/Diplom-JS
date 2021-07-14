'use strict';

import smoothscroll from './modules/smoothscroll';
import phoneDropdown from './modules/phoneDropdown';
import bodyListeners from './modules/bodylisteners';
import maskPhone from "./modules/maskPhone";
import sendForm from './modules/sendForm';
import prompts from './modules/prompts';
import repairTabs from './modules/repairTabs';
import portfolio from './modules/portfolio';
import portfolioMobile from './modules/portfolioMobile';
import portfolioPopupSlider from './modules/portfolioPopupSlider';
import documents from './modules/documents';

smoothscroll(0.2);
phoneDropdown();
bodyListeners();
maskPhone('input[name="phone"]');

sendForm('feedback1');
sendForm('feedback2');
sendForm('feedback3');
sendForm('feedback4');
sendForm('feedback5');
sendForm('feedback6');

prompts();
repairTabs();
portfolio();
portfolioMobile();
portfolioPopupSlider();
documents();