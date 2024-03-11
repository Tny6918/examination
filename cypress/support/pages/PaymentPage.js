import user from "../../fixtures/user.json";
import BasePage from "./BasePage";
import {faker} from "@faker-js/faker";

user.cardname = faker.person.fullName();
user.cardnum = faker.finance.accountNumber({length: 16});

class PaymentPage extends BasePage{
    constructor() {
        super();
        this.expansionCardPanel = '#mat-expansion-panel-header-0';

        this.addCardNameField = '#mat-input-1';
        this.addCardNumField = '#mat-input-2';
        this.addExpiryMonthDropDown = '#mat-input-3';
        this.optionExpiryMonth = 'option[value="1"]';
        this.addExpiryYearDropDown = '#mat-input-4';
        this.optionExpiryYear = 'option[value="2080"]';
        this.continueButtonPayment = '#submitButton';

        this.addedPaymentCardName = 'mat-cell.mat-column-Name';

    }

    getExpansionCardPanel() {
        return cy.get(this.expansionCardPanel);
    }

    getCardNameField() {
        return cy.get(this.addCardNameField);
    }

    getCardNumField() {
        return cy.get(this.addCardNumField);
    }

    getExpiryMonthDropDown() {
        return cy.get(this.addExpiryMonthDropDown);
    }

    getOptionExpiryMonth() {
        return cy.get(this.optionExpiryMonth);
    }

    getExpiryYearDropDown() {
        return cy.get(this.addExpiryYearDropDown);
    }

    getOptionExpiryYear() {
        return cy.get(this.optionExpiryYear);
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
        this.getExpiryMonthDropDown().click();
        this.getOptionExpiryMonth().click();
        this.getExpiryYearDropDown().click();
        this.getOptionExpiryYear().click();
        this.getContinueButtonPayment().click();
    }
}

export default new PaymentPage()