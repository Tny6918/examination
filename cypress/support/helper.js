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

export function findProduct(productName) {
    cy.get('body').then((body) => {
        if (body.find(`div.item-name`).contents(${productName}).length > 0) {
            cy.get(`.mat-grid-list`)
                .find('button')
                .contains('Add to basket')
                .click();
        } else {
            cy.log('No button add to basket found');
        }
    })
}
