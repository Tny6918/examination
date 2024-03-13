import user from "../fixtures/user.json"
export function generatePassword(fakerPass, specialSymbol) {
    return fakerPass + specialSymbol;
}

export function headlessLogin(userEmail, userPassword) {
    cy.request({
        method: 'POST',
        url: '/rest/user/login',
        body: {
            "email": userEmail,
            "password": userPassword
        }
    }).then(response => {
        expect(response.isOkStatusCode).to.be.true;
        expect(response.body.authentication).to.have.property('umail');
        expect(response.body.authentication.umail).to.equal(userEmail);

        let tokenAuth = response.body.authentication.token;
        cy.setCookie('token', tokenAuth);
        window.localStorage.setItem('token', tokenAuth);
    })
}

export function headlessRegistration(userEmail, userPassword, userSecurityAnswer, userTimeCreation) {
    cy.request({
        method: 'POST',
        url: '/api/Users',
        body: {
            "email": userEmail,
            "password": userPassword,
            "passwordRepeat": userPassword,
            "securityAnswer": userSecurityAnswer,
            "securityQuestion": {
                "createdAt": userTimeCreation,
                "id": 2,
                "question": "Mother's maiden name?",
                "updatedAt": userTimeCreation
            }
        }
    }).then(response => {
        expect(response.status).to.eq(201);
        //expect(response.body.data.email).to.have.property(`${userEmail}`);
    })
}

export function findProduct() {
    cy.get('body').then((body) => {
        if (body.find(`button[aria-label="Add to Basket"]`).length > 0) {
            cy.get(`button[aria-label="Add to Basket"]`).first().click();
        } else {
            cy.log('No button add to basket found');
        }
    })
}

export function findProduct2(productName) {
    cy.get('body').then((body) => {
        if (body.find(`div.item-name:contains("${productName}")`).length > 0) {
            cy.get(`div.item-name:contains("${productName}")`)
                .find('[aria-label="Add to Basket"]')
                .click();
        } else {
            cy.log('No item with given product name found');
        }
    })
}

export function findProduct3(productName) {
    cy.get('body').then((body) => {
        if (body.find(`div.item-name:contains("${productName}")`).length > 0) {
            cy.get('[aria-label="Add to Basket"]').click();
        } else {
            cy.log('No item with given product name found');
        }
    })
}

export function closePopupWindow() {
    cy.get('body').then((body) => {
        if(body.find(`#mat-dialog-0`).length > 0) {
            cy.log('Closing the found welcome pop-up');
            cy.get(`body`).click(0,0);
            //cy.get(`.close-dialog`, {timeout: 6000}).should('not.be.visible');

        } else {
            cy.log('no popup window was found to close');
        }
    })
}
