import BasePage from "./BasePage";
import {faker} from "@faker-js/faker";
import user from "../../fixtures/user.json";

user.comment = faker.word.adjective();
let successToastText = 'Thank you for your feedback.';

class FeedbackPage extends BasePage{
    constructor() {
        super();

        this.commentField = '#comment';
        this.ratingSlider = '#rating';
        this.captcha = '#captcha';
        this.resultCaptcha = '#captchaControl';
        this.submitFeedbackButton = '#submitButton';

        this.successToast = 'span.mat-simple-snack-bar-content';

        this.closePopupButton = '.close-dialog';

    }

    visit() {
        cy.log('Open the feedback form');
        cy.visit('/#/contact')
    }

    getClosePopupButton() {
        return cy.get(this.closePopupButton);
    }

    getCommentField() {
        return cy.get(this.commentField);
    }

    getRatingSlider() {
        return cy.get(this.ratingSlider);
    }

    getCaptcha() {
        return cy.get(this.captcha);
    }

    getResultCaptcha() {
        return cy.get(this.resultCaptcha);
    }

    getSubmitFeedbackButton() {
        return cy.get(this.submitFeedbackButton);
    }

    getSuccessesToastMessage() {
        return cy.get(this.successToast);
    }


    closePopupWindow() {
        this.getClosePopupButton().click();
    }

    addComment() {
        this.getCommentField().type(user.comment);
    }

    changeRatingSlider() {
        const step = 1;
        const arrow = '{rightarrow}'.repeat(step);
        this.getRatingSlider().type(arrow);
    }

    solveCaptcha() {
        this.getCaptcha().invoke('text').then(expression => {
            let captcha = eval(expression);
            this.getResultCaptcha().type(captcha);

        })

    }

    submitFeedback() {
        this.getSubmitFeedbackButton().click();
    }

    checkSuccessesToast() {
        this.getSuccessesToastMessage().then(toast => {
            cy.wrap(toast).should('have.text', successToastText);
        })
    }
}

export default new FeedbackPage()