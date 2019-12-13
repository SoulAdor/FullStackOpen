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
    cy.get('#username')
      .type('Soul')
    cy.get('#password')
      .type('secret')
    cy.contains('Login')
      .click()
  })

  it('a new blog can be created and comment added', function() {
    cy.contains('New blog')
    .click()

    cy.get('#create_title')
    .type('a title created by cypress')
    cy.get('#create_author')
    .type('an author created by cypress')
    cy.get('#create_url')
    .type('an url created by cypress')
    cy.get('#create_button')
      .click()
    cy.contains('a title created by cypress')
    cy.contains('an author created by cypress')
    
    cy.get('[data-cy=link_to_blog]').click()
    cy.get('[data-cy=comment]').type('a comment created by cypress')
    cy.get('[data-cy=comment-add-button]').click()
    cy.contains('a comment created by cypress')

    cy.contains('Users')
    .click()
    cy.contains('Andrew')
    cy.get('[data-cy=num-blogs]').contains('1')
  })
})