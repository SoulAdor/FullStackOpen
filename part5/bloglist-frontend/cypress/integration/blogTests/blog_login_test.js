describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Andrew',
      username: 'Soul',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('front page contains login', function() {
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.contains('Login')
      .click()
  })

  it('user can login', function() {
    cy.get('#username')
      .type('Soul')
    cy.get('#password')
      .type('secret')
    cy.contains('Login')
      .click()
    cy.contains('Andrew logged in')
  })
})