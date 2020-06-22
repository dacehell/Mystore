describe('Login', () =>{
    let url = 'http://localhost:8080/login'
    it('redirect home if login successful', () =>{
        cy.visit(url)
        
        cy.get('#email').type('caldera.david78@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('button.is-primary').click()
        
        //cy.get('#navbarMenu').contains('Usuario')
        
    })
})