describe('Register - inupts required', () => {
  beforeEach(() => {
    cy.visit('/users/register');
  });
  it('successfully load register page', () => {
    cy.url().should('include', '/users/register');
    cy.contains('h2', 'Sign up');
  });
  it('find link to login', () => {
    cy.contains('login').should('have.attr', 'href', '/users/login');
  });
  it('inputs and error element should be initially empty', () => {
    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
    cy.get('.sc-faUpoM').should(($el) => {
      expect($el.text().trim()).equal('');
    });
  });
  it('be able to type name, email and password', () => {
    cy.get('#name').type('John').should('have.value', 'John');
    cy.get('#email')
      .type('email@gmail.com')
      .should('have.value', 'email@gmail.com');
    cy.get('#password')
      .type('realy!strongp4ssw0rd')
      .should('have.value', 'realy!strongp4ssw0rd');
  });
});

describe('Register - successfully ', () => {
  it('register successfully and redirect to tasks list', () => {
    cy.visit('/users/register');
    cy.get('#name').type('John');
    cy.get('#email').type('correct@email.com');
    cy.get('#password').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.url().should('include', '/task');
  });
});

describe('Register - user remove inputs required attribute ', () => {
  beforeEach(() => {
    cy.visit('/users/register');
    cy.get('#name').invoke('removeAttr', 'required');
    cy.get('#email').invoke('removeAttr', 'required');
    cy.get('#password').invoke('removeAttr', 'required');
  });

  it('inputs should not have required attribute', () => {
    cy.get('#name').should('not.have.attr', 'required');
    cy.get('#email').should('not.have.attr', 'required');
    cy.get('#password').should('not.have.attr', 'required');
  });

  it('show error message on empty name, email and password', () => {
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your name, email and password');
  });

  it('show error message on empty name', () => {
    cy.get('#email').type('email@gmail.com');
    cy.get('#password').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your name, email and password');
  });

  it('show error message on empty email', () => {
    cy.get('#name').type('John');
    cy.get('#password').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your name, email and password');
  });

  it('show error message on empty password', () => {
    cy.get('#name').type('John');
    cy.get('#email').type('email@gmail.com');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your name, email and password');
  });

  it("show error message on 'Space' as email and password", () => {
    cy.get('#name').type(' ');
    cy.get('#email').type(' ');
    cy.get('#password').type(' ');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your name, email and password');
  });

  it('show error if whitespace characters provided', () => {
    cy.get('#name').type('Jo hn');
    cy.get('#email').type('email@gmail.com');
    cy.get('#password').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains("You can't use any whitespace characters");
  });

  it('show error if user whith this email already exist', () => {
    cy.get('#name').type('John');
    cy.get('#email').type('correct@email.com');
    cy.get('#password').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('User with this email already exist');
  });
});
