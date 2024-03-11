import user from "../fixtures/user.json";
import feedbackPage from "../support/pages/FeedbackPage";

describe('Test submit feedback', () => {
    it('positive test for the submitting feedback', () => {
        feedbackPage.visit();
        feedbackPage.closePopupWindow();

        cy.log('Add comment and check it')
        feedbackPage.addComment();
        feedbackPage.getCommentField().should('have.prop', 'value', user.comment);

        cy.log('Change the rating slider and check it')
        feedbackPage.changeRatingSlider();
        feedbackPage.getRatingSlider().should('have.attr', 'aria-valuenow', 3);

        cy.log('Solve captcha');
        feedbackPage.solveCaptcha();

        cy.log('Submit the provided feedback');
        feedbackPage.submitFeedback();
        feedbackPage.checkSuccessesToast();
    })
})