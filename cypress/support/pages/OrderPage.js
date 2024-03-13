import BasePage from "./BasePage";
import {closePopupWindow} from "../helper";


class OrderPage extends BasePage{

    constructor() {
        super();
        this.productCard = 'mat-card.mat-card';
        this.closePopupButton = 'button.close-dialog';

        this.shoppingCart = '[aria-label="Show the shopping cart"]';
        this.checkoutButton = '#checkoutButton';

        this.radioButtonAddress = '#mat-radio-40';
        this.continueButton = '[aria-label="Proceed to payment selection"]';

        this.radioButtonDelivery = '#mat-radio-41-input';
        this.continueButtonDelivery = '[aria-label="Proceed to delivery method selection"]';

        this.radioButtonCard = 'mat-radio-button.mat-radio-button';
        this.continueButtonToReview = '[aria-label="Proceed to review"]';

        this.buttonPlaceOrder = '#checkoutButton';

    }

    getProductCard() {
        return cy.get(this.productCard, {timeout: 6000});
    }

    visit() {
        cy.log('Open home page with product catalog')
        cy.visit('/');
        this.getProductCard().should('be.visible');
    }

    getPopupWindow() {
        return cy.get(this.closePopupButton, {timeout: 10000});
    }

    getShoppingCart() {
        return cy.get(this.shoppingCart);
    }

    getCheckoutButton() {
        return cy.get(this.checkoutButton);
    }

    getRadioButtonAddress() {
        return cy.get(this.radioButtonAddress);
    }

    getContinueButton() {
        return cy.get(this.continueButton);
    }

    getRadioButtonDelivery() {
        return cy.get(this.radioButtonDelivery);
    }

    getContinueButtonDelivery() {
        return cy.get(this.continueButtonDelivery);
    }

    getRadioButtonCard() {
        return cy.get(this.radioButtonCard);
    }

    getContinueButtonToReview() {
        return cy.get(this.continueButtonToReview);
    }

    getButtonPlaceOrder() {
        return cy.get(this.buttonPlaceOrder);
    }


    closePopupWelcomeWindow() {
        this.getPopupWindow().click();
    }

    openShoppingCart() {
        this.getShoppingCart().click();
    }

    checkoutFromShoppingCart() {
        this.getCheckoutButton().click();
    }

    addNewAddress() {
        this.getRadioButtonAddress().check();
    }

    completeAddingNewAddress() {
        this.getContinueButton().click();
    }

    selectDeliveryAddress() {
        this.getRadioButtonDelivery().check();
    }

    completeAddingDelivery() {
        this.getContinueButtonDelivery().click();
    }

    addNewPaymentCard() {
        this.getRadioButtonCard().check();
    }

    proceedToReviewOrder() {
        this.getContinueButtonToReview().click();
    }

    placeOrder() {
        this.getButtonPlaceOrder().click();
    }

}

export default new OrderPage()