export default class BasePage {

    constructor() {
        this.accountButton = '#navbarAccount';

    }

    getAccountButton() {
        return cy.get(this.accountButton)
    }

}