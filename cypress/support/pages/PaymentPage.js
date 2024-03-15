import user from "../../fixtures/user.json";
import BasePage from "./BasePage";
import {faker} from "@faker-js/faker";

user.cardname = faker.person.fullName();
user.cardnum = faker.finance.accountNumber({length: 16});

class PaymentPage extends BasePage{
    constructor() {
        super();
        this.expansionCardPanel = '#mat-expansion-panel-header-0';

        this.addCardNameFieldParent = 'div.mat-form-field-infix';
        this.addCardNameFieldChild = 'mat-label.ng-star-inserted';
        this.addCardNumFieldParent = 'div.mat-form-field-flex';
        this.addCardNumFieldChild = 'mat-label.ng-star-inserted';
        this.ExpiryMonth = 'select.mat-input-element';

        this.continueButtonPayment = '#submitButton';

        this.addedPaymentCardName = 'mat-cell.mat-column-Name';

    }

    getExpansionCardPanel() {
        return cy.get(this.expansionCardPanel);
    }

    getCardNameField() {
        return cy.get(this.addCardNameFieldChild).contains('Name').parents(this.addCardNameFieldParent);
    }

    getCardNumField() {
        return cy.get(this.addCardNumFieldChild).contains('Card Number').parents(this.addCardNumFieldParent);
    }

    getExpiryMonth()  {
        return cy.get(this.ExpiryMonth).first();
    }

    setExpiryMonth() {
        this.getExpiryMonth().select('1').should('have.value', '1');
    }

    getExpiryYear() {
        return cy.get(this.ExpiryMonth).last();
    }

    setExpiryYear() {
        this.getExpiryYear().select('2080').should('have.value', '2080');
    }

    getContinueButtonPayment() {
        return cy.get(this.continueButtonPayment);
    }

    //used to test in e2e test to check matching names
    getAddedPaymentCardName() {
        return cy.get(this.addedPaymentCardName);
    }



    fillPaymentOptionFields() {
        this.getExpansionCardPanel().click();
        this.getCardNameField().type(user.cardname);
        this.getCardNumField().type(user.cardnum);
        this.setExpiryMonth();
        this.setExpiryYear();
        this.getContinueButtonPayment().click();
        this.getAddedPaymentCardName().should('have.text', `${user.cardname}`);
    }
}

export default new PaymentPage()