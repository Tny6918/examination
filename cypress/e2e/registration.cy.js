import user from "../fixtures/user.json"
import registrationPage from "../support/pages/RegistrationPage";
import loginPage from "../support/pages/LoginPage";


describe('register with valid data', () => {
  it('Registration', () => {
    registrationPage.visit();

    registrationPage.openLoginForm();
    registrationPage.closePopupWindow();
    registrationPage.getRegistrationForm().should('contain', 'Not yet a customer?');

    registrationPage.openRegistrationForm();

    registrationPage.fillRegistrationForm();
    registrationPage.getEmailField().should('have.prop', 'value', user.email);
    registrationPage.getPasswordField().should('have.prop', 'value', user.password);

    registrationPage.fillSecurityRegForm();
    registrationPage.getAnswerField().should('have.prop', 'value', user.answer);

    registrationPage.submitRegistration();

  })

  it('Authorization with registered user', () => {
    loginPage.visit();
    loginPage.closePopupWindow();

    loginPage.fillLoginFields(user.email, user.password);
    loginPage.checkAuthorisedUser();
    loginPage.getAuthorisedUserEmail().should('have.text', ' ' + user.email + ' ');

  })
})