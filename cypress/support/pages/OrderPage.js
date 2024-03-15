import BasePage from "./BasePage";

class OrderPage extends BasePage {

    constructor() {
        super();
        this.closePopupButton = 'button.close-dialog';

        this.shoppingCart = '[aria-label="Show the shopping cart"]';
        this.boughtProduct = 'mat-cell.cdk-column-product';
        this.checkoutButton = '#checkoutButton';

        this.radioButtonAddedAddress = 'span.mat-radio-inner-circle';
        this.continueButtonDeliveryParent = '[aria-label="Proceed to payment selection"]';
        this.continueButtonDeliveryChild = 'span.mat-button-wrapper';


        this.checkboxTypeOfDeliveryParent = '#mat-radio-41';
        this.checkboxTypeOfDeliveryChild = 'span.mat-radio-inner-circle';
        this.continueButtonDeliveryTypeParent = '[aria-label="Proceed to delivery method selection"]';
        this.continueButtonDeliveryTypeChild = 'span.mat-button-wrapper';

        this.radioButtonCard = 'span.mat-radio-inner-circle';
        this.continueButtonToReviewParent = '[aria-label="Proceed to review"]';
        this.continueButtonToReviewChild = 'span.mat-button-wrapper';

        this.buttonPlaceOrder = '#checkoutButton';

        this.confirmationOrderMessage = 'h1.confirmation';

    }

    visit() {
        cy.log('Open home page with product catalog')
        cy.visit('/');
        //this.getProductCard().should('be.visible');
    }

    getShoppingCart() {
        return cy.get(this.shoppingCart);
    }

    getBoughtProduct() {
        return cy.get(this.boughtProduct, {timeout: 15000});
    }

    getCheckoutButton() {
        return cy.get(this.checkoutButton);
    }

    getRadioButtonAddedAddress() {
        return cy.get(this.radioButtonAddedAddress);
    }

    getContinueButtonDelivery() {
        return cy.get(this.continueButtonDeliveryChild).parents(this.continueButtonDeliveryParent);
    }

    getCheckboxDeliveryType() {
        return cy.get(this.checkboxTypeOfDeliveryParent).find(this.checkboxTypeOfDeliveryChild);
    }

    getContinueButtonDeliveryType() {
        return cy.get(this.continueButtonDeliveryTypeChild).parents(this.continueButtonDeliveryTypeParent);
    }

    getRadioButtonCard() {
        return cy.get(this.radioButtonCard).first();
    }

    getContinueButtonToReview() {
        return cy.get(this.continueButtonToReviewChild).parents(this.continueButtonToReviewParent);
    }

    getButtonPlaceOrder() {
        return cy.get(this.buttonPlaceOrder);
    }

    getConfirmationOrderMessage() {
        return cy.get(this.confirmationOrderMessage);
    }

    openShoppingCart() {
        this.getShoppingCart().click();
        this.getBoughtProduct().should('be.visible');
    }

    checkoutFromShoppingCart() {
        this.getCheckoutButton().click();
    }

    selectDeliveryAddress() {
        this.getRadioButtonAddedAddress().click();
        this.getContinueButtonDelivery().click();
    }

    selectDeliveryType() {
        this.getCheckboxDeliveryType().click();
        this.getContinueButtonDeliveryType().click();
    }

    addNewPaymentCard() {
        this.getRadioButtonCard().click();
    }

    proceedToReviewOrder() {
        this.getContinueButtonToReview().click();
    }

    placeOrder() {
        this.getButtonPlaceOrder().click();
    }

}

export default new OrderPage()