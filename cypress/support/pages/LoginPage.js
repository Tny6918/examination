import BasePage from "./BasePage";

class LoginPage extends BasePage{

    constructor() {
        super();
        this.closePopupButton = '.close-dialog';

        this.emailLoginField = '#email';
        this.passwordLoginField = '#password';
        this.authLoginButton = '#loginButton';

        this.authorisedUserEmail = `button[aria-label="Go to user profile"] span`;
    }

    visit() {
        cy.log('Open login form');
        cy.visit('/#/login')
    }

    getClosePopupButton() {
        return cy.get(this.closePopupButton);
    }

    getEmailLoginField() {
        return cy.get(this.emailLoginField);
    }

    getPasswordLoginField() {
        return cy.get(this.passwordLoginField);
    }

    getAuthLoginButton() {
        return cy.get(this.authLoginButton);
    }

    getAuthorisedUserEmail() {
        return cy.get(this.authorisedUserEmail);
    }


    closePopupWindow() {
        this.getClosePopupButton().click();
    }

    fillLoginFields(email = '', password = '') {
        cy.log('Fill in authorization fields');
        email ? this.getEmailLoginField().type(email) : cy.log('Skip email field');
        password ? this.getPasswordLoginField().type(password) : cy.log('Skip password field');
        this.getAuthLoginButton().click();
    }

    fillLoginFieldsWithoutSubmit(email = '', password = '') {
        cy.log('Fill in authorization fields');
        email ? this.getEmailLoginField().type(email) : cy.log('Skip email field');
        password ? this.getPasswordLoginField().type(password) : cy.log('Skip password field');
    }

    checkAuthorisedUser() {
        cy.log('check if the authorized user has the same email from registration');
        this.getAccountButton().click();
    }

}

export default new LoginPage()