import BasePage from "./BasePage";
import user from "../../fixtures/user.json"
import {faker} from "@faker-js/faker";
import {generatePassword} from "../helper";


let fakerPass = faker.internet.password({length: 8});
let specialSymbol = '1$';

user.email = faker.internet.email({allowSpecialCharacters: true});
user.password = generatePassword(fakerPass, specialSymbol);
user.answer = faker.person.lastName();

class RegistrationPage extends BasePage {

    constructor() {
        super();
        this.loginButton = '#navbarLoginButton';

        this.registrationButton = '#newCustomerLink';

        this.closePopupButton = '.close-dialog';

        this.emailField = '#emailControl';
        this.passwordField = '#passwordControl';
        this.repeatPasswordField = '#repeatPasswordControl';
        this.togglePasswordAdvice = '#mat-slide-toggle-1';
        this.passwordAdvice = 'span.ng-tns-c128-19';

        this.securityQuestion = '.mat-select-placeholder';
        this.optionMaidenName = '#mat-option-4';
        this.answerField = '#securityAnswerControl';

        this.submitRegisterButton = '#registerButton';
    }

    visit() {
        cy.visit('/');
    }

    getClosePopupButton() {
        return cy.get(this.closePopupButton);
    }

    getLoginButton() {
        return cy.get(this.loginButton);
    }

    getRegistrationForm() {
        return cy.get(this.registrationButton);
    }

    getEmailField() {
        return cy.get(this.emailField);
    }

    getPasswordField() {
        return cy.get(this.passwordField);
    }

    getPasswordRepeatField() {
        return cy.get(this.repeatPasswordField);
    }

    getTogglePasswordAdvice() {
        return cy.get(this.togglePasswordAdvice);
    }

    getPasswordAdvice() {
        return cy.get(this.passwordAdvice);
    }

    getSecurityQuestion() {
        return cy.get(this.securityQuestion);
    }

    getOptionMaidenName() {
        return cy.get(this.optionMaidenName);
    }

    getAnswerField() {
        return cy.get(this.answerField);
    }

    getSubmitRegisterButton() {
        return cy.get(this.submitRegisterButton);
    }

    closePopupWindow() {
        this.getClosePopupButton().click();
    }

    openLoginForm() {
        cy.log('Open log in form to get to registration form');
        this.getAccountButton().click({timeout: 3000});
        this.getLoginButton().click({timeout: 3000});
    }

    openRegistrationForm() {
        cy.log('Open registration form');
        this.getRegistrationForm().click({timeout: 3000});
    }

    fillRegistrationForm() {
        cy.log('Fill out the fields for the registration: email. password, repeat password and check the toggle to see the advice for the password field');
        this.getEmailField().type(user.email);
        this.getPasswordField().type(user.password);
        this.getPasswordRepeatField().type(user.password);
        this.getTogglePasswordAdvice().click();
        this.getPasswordAdvice().contains('contains at least one lower character');
    }

    fillSecurityRegForm() {
        cy.log('Choosing security question and providing an answer');
        this.getSecurityQuestion().click();
        this.getOptionMaidenName().click();
        this.getAnswerField().type(user.answer);
    }

    submitRegistration() {
        cy.log('Submit registration form');
        this.getSubmitRegisterButton().click();
    }
}

export default new RegistrationPage()