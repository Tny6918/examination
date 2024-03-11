import user from "../fixtures/user.json";
import loginPage from "../support/pages/LoginPage";
import registrationPage from "../support/pages/RegistrationPage";
import addressPage from "../support/pages/AddressPage";
import paymentPage from "../support/pages/PaymentPage";
import orderPage from "../support/pages/OrderPage";
import {findProduct} from "../support/helper";

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
    })

    it('creating a new purchase', () => {
        cy.log('Finding product and adding it to the cart');

        findProduct(' Apple Juice (1000ml) ');
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
