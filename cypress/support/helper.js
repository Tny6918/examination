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

        //let continueCode
        let tokenAuth = response.body.authentication.token;
        let bidAuth = response.body.authentication.bid;
        cy.setCookie('token', tokenAuth);
        window.localStorage.setItem('token', tokenAuth);
        window.sessionStorage.setItem('bid', bidAuth);
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
    })
}

export function findProduct2(productName) {
    cy.get('mat-card').then((body) => {
        if (body.find(`div.item-name:contains("${productName}")`).length > 0) {
            cy.get(`div.item-name:contains("${productName}")`)
                .parents('.mat-card')
                .find('button[aria-label="Add to Basket"]')
                .click();
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
        } else {
            cy.log('no popup window was found to close');
        }
    })
}
