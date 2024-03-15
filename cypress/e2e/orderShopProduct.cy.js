import user from "../fixtures/user.json";
import addressPage from "../support/pages/AddressPage";
import paymentPage from "../support/pages/PaymentPage";
import orderPage from "../support/pages/OrderPage";
import {findProduct2, closePopupWindow} from "../support/helper";
import {faker} from "@faker-js/faker";
import registrationPage from "../support/pages/RegistrationPage";
import loginPage from "../support/pages/LoginPage";

user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.person.lastName();
user.timeCreation = faker.date.recent().toISOString();

describe('Placing order', () => {
    before(() => {
        cy.log('Open registration form')
        registrationPage.visit();
        registrationPage.openLoginForm();
        registrationPage.closePopupWindow();
        registrationPage.openRegistrationForm();

        cy.log('Fill registration form')
        registrationPage.fillRegistrationForm();
        registrationPage.fillSecurityRegForm();
        registrationPage.submitRegistration();

        cy.log('Fill login form')
        loginPage.fillLoginFields(user.email, user.password);
        loginPage.checkAuthorisedUser();
        loginPage.getAuthorisedUserEmail().should('be.visible');
    })


    it('creating a new purchase', () => {

        cy.intercept('GET', '/api/Products/*').as('Products');
        orderPage.visit();

        findProduct2('Apple Pomace');
        cy.wait('@Products');
        orderPage.openShoppingCart();
        orderPage.checkoutFromShoppingCart();

        cy.log('Adding address');
        addressPage.completeAddAddressForm();

        cy.log('Selecting added new address as a delivery address');
        orderPage.selectDeliveryAddress();

        cy.log('Selecting type of delivery');
        orderPage.selectDeliveryType();

        cy.log('Adding payment method and selecting new payment card');

        paymentPage.fillPaymentOptionFields();
        orderPage.addNewPaymentCard();
        orderPage.proceedToReviewOrder();

        cy.log('Placing new order');

        orderPage.placeOrder();
        orderPage.getConfirmationOrderMessage().should('be.visible');


    })
})
