describe('Products page', () =>{
    let url = 'http://localhost:8080/'

    it('Filters product list', () =>{
        cy.visit(url)
        
        cy.get('.column.is-4').should('have.length',14)

        cy.get('input').type('casa')
        cy.get('.column.is-4').should('have.length',1)

        cy.get('input').clear().type('guitarra')
        cy.get('.column.is-4').should('have.length',0)
    })

    it('Add prodcuts to shopping cart', () =>{
        cy.visit(url)
        
        cy.get('input').clear()
        cy.get('.card button.is-pulled-right.is-warning').first().click()
        cy.get('.navbar-burger').click()
        cy.get('span.tag.is-warning').contains('1')
        
    })

    it('Deleted shopping cart products', () => {
        cy.visit(url)
        
        cy.get('.card button.is-pulled-right.is-warning').first().click()
        cy.get('.navbar-burger').click()
        cy.get('[data-testId="cart"]').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 1)
        cy.get('.modal-card-body').find('button.is-danger.is-small').click()
        cy.get('.modal-card-body').find('div.card-content').should('have.length', 0)
    })
})