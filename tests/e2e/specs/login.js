describe('Login', () =>{
    let url = 'http://localhost:8080/login'
    it('redirect home if login successful', () =>{
        cy.visit(url)
        
        cy.get('#email').type('user1@mystore.com')
        cy.get('#password').type('password')
        cy.get('button.is-primary').click()
        cy.get('.navbar-burger').click()
        cy.get('#navbarMenu').contains('Usuario')
        
    })
})