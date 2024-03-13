import user from "../fixtures/user.json";
import loginPage from "../support/pages/LoginPage";
import registrationPage from "../support/pages/RegistrationPage";
import addressPage from "../support/pages/AddressPage";
import paymentPage from "../support/pages/PaymentPage";
import orderPage from "../support/pages/OrderPage";
import {findProduct2} from "../support/helper";
import {headlessRegistration} from "../support/helper";
import {faker} from "@faker-js/faker";
import {headlessLogin} from "../support/helper";


user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.person.lastName();
user.timeCreation = faker.date.recent().toISOString();

describe('Placing order', () => {
    before(() => {
        cy.log('Headless registration');
        headlessRegistration(user.email, user.password, user.securityAnswer, user.timeCreation);

        cy.log('Headless login');
        headlessLogin(user.email, user.password);
    });
    it('creating a new purchase', () => {


        orderPage.visit();
        orderPage.closePopupWelcomeWindow();

        cy.log('Finding product and adding it to the cart');

        findProduct2();
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
