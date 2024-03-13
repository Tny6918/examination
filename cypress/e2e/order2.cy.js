import user from "../fixtures/user.json";
import addressPage from "../support/pages/AddressPage";
import paymentPage from "../support/pages/PaymentPage";
import orderPage from "../support/pages/OrderPage";
import {findProduct, findProduct2} from "../support/helper";
import {headlessRegistration} from "../support/helper";
import {faker} from "@faker-js/faker";
import {headlessLogin} from "../support/helper";
import {closePopupWindow} from "../support/helper";
import {itemSearchMainPage} from "../support/helper";
import registrationPage from "../support/pages/RegistrationPage";
import loginPage from "../support/pages/LoginPage";

user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.person.lastName();
user.timeCreation = faker.date.recent().toISOString();

describe('Placing order', () => {
    before(() => {
        registrationPage.visit();
        registrationPage.openLoginForm();
        registrationPage.closePopupWindow();
        registrationPage.openRegistrationForm();

        registrationPage.fillRegistrationForm();
        registrationPage.fillSecurityRegForm();
        registrationPage.submitRegistration();


        loginPage.fillLoginFields(user.email, user.password);
        loginPage.checkAuthorisedUser();
        loginPage.getAuthorisedUserEmail().should('have.text', ' ' + user.email + ' ');
    })


    it('creating a new purchase', () => {

        orderPage.visit();

        findProduct2('Apple Pomace');
        orderPage.openShoppingCart();
        orderPage.checkoutFromShoppingCart();

        cy.log('Adding address and selecting delivery');

        orderPage.addNewAddress();
        addressPage.fillAddressFields();
        orderPage.completeAddingNewAddress();

        orderPage.selectDeliveryAddress();
        orderPage.completeAddingDelivery();

        cy.log('Adding payment method and selecting new payment card');

        orderPage.addNewPaymentCard();
        paymentPage.fillPaymentOptionFields();
        orderPage.proceedToReviewOrder();

        cy.log('Review and placing new order');

        orderPage.proceedToReviewOrder();

    })
})
