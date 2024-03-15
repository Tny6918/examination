import user from "../fixtures/user.json";
import loginPage from "../support/pages/LoginPage";
import {headlessLogin} from "../support/helper";
import registrationPage from "../support/pages/RegistrationPage";

describe('Authorization positive test', () => {
    it('Registration before login', () => {
        registrationPage.visit();
        registrationPage.openLoginForm();
        registrationPage.closePopupWindow();
        registrationPage.openRegistrationForm();

        registrationPage.fillRegistrationForm();
        registrationPage.fillSecurityRegForm();
        registrationPage.submitRegistration();
    })

    it('Authorization test', () => {
        loginPage.visit();

        loginPage.closePopupWindow();
        loginPage.fillLoginFields(user.email, user.password);
        loginPage.checkAuthorisedUser();
        loginPage.getAuthorisedUserEmail().should('be.visible');

    })
})

describe('Authorization negative tests', () => {
    it('Authorization without email', () => {
        loginPage.visit();
        loginPage.closePopupWindow();
        loginPage.fillLoginFieldsWithoutSubmit('', user.password);

        cy.log('the button Log in should be inactive');
        loginPage.getAuthLoginButton().should('be.disabled');
    })

    it('Authorization without password', () => {
        loginPage.visit();
        loginPage.closePopupWindow();
        loginPage.fillLoginFieldsWithoutSubmit(user.email, '');

        cy.log('the button Log in should be inactive');
        loginPage.getAuthLoginButton().should('be.disabled');
    })

    it('Authorization without email and password', () => {
        loginPage.visit();
        loginPage.closePopupWindow();
        loginPage.fillLoginFieldsWithoutSubmit('', '');

        cy.log('the button Log in should be inactive');
        loginPage.getAuthLoginButton().should('be.disabled');
    })
})