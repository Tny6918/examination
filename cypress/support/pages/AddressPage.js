import user from "../../fixtures/user.json"
import BasePage from "./BasePage";
import {faker} from "@faker-js/faker";

user.country = faker.location.country();
user.name = faker.person.firstName();
user.mobile = faker.string.numeric(10);
user.zip = faker.string.numeric(5);
user.address = faker.location.streetAddress();
user.city = faker.location.city();
user.state = faker.location.state();


class AddressPage extends BasePage{
    constructor() {
        super();

        this.addNewAddressButton = '[aria-label="Add a new address"]';
        this.addNewAddressChildButton = 'span.mat-button-wrapper';
        this.addCountryField = '#mat-input-1';
        this.addNameField = '#mat-input-2';
        this.addMobileNumberField = '#mat-input-3';
        this.addZipField = '#mat-input-4';
        this.addAddressField = '#address';
        this.addCityField = '#mat-input-6';
        this.addStateField = '#mat-input-7';
        this.submitAddressButton = '#submitButton';

        this.addedAddressCountry = 'mat-cell.cdk-column-Country';

    }

    getNewAddressButton() {
        return cy.get(this.addNewAddressChildButton).parents(this.addNewAddressButton);
    }

    getCountryField() {
        return cy.get(this.addCountryField);
    }

    getNameField() {
        return cy.get(this.addNameField);
    }

    getMobileNumberField() {
        return cy.get(this.addMobileNumberField);
    }

    getZipField() {
        return cy.get(this.addZipField);
    }

    getAddressField() {
        return cy.get(this.addAddressField);
    }

    getCityField() {
        return cy.get(this.addCityField);
    }

    getStateField() {
        return cy.get(this.addStateField);
    }

    getSubmitAddressButton() {
        return cy.get(this.submitAddressButton);
    }

    getAddedAddressCountry() {
        return cy.get(this.addedAddressCountry);
    }


    completeAddAddressForm() {
        this.getNewAddressButton().click();
        this.getCountryField().type(user.country);
        this.getNameField().type(user.name);
        this.getMobileNumberField().type(user.mobile);
        this.getZipField().type(user.zip);
        this.getAddressField().type(user.address);
        this.getCityField().type(user.city);
        this.getStateField().type(user.state);
        this.getSubmitAddressButton().click();
        this.getAddedAddressCountry().should('have.text', `${user.country}`);
    }

}

export default new AddressPage()