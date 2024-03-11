import BasePage from "./BasePage";


class OrderPage extends BasePage{

    constructor() {
        super();
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