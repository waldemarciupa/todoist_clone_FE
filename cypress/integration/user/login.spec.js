describe('Login - inupts required', () => {
  beforeEach(() => {
    cy.visit('/users/login');
  });

  it('successfully load login page', () => {
    cy.url().should('include', '/users/login');
    cy.contains('h2', 'Log in');
  });

  it('find link to register', () => {
    cy.contains('Sign up').should('have.attr', 'href', '/user/register');
  });

  it('inputs and error element should be initially empty', () => {
    cy.get('[type=email]').should('have.value', '');
    cy.get('[type=password]').should('have.value', '');
    cy.get('.sc-faUpoM').should(($el) => {
      expect($el.text().trim()).equal('');
    });
  });

  it('be able to type an email and password', () => {
    cy.get('[type=email]')
      .type('email@gmail.com')
      .should('have.value', 'email@gmail.com');

    cy.get('[type=password]')
      .type('realy!strongp4ssw0rd')
      .should('have.value', 'realy!strongp4ssw0rd');
  });

  it('show error message on invalid email or password', () => {
    cy.get('[type=email]').type('email@gmail.com');
    cy.get('[type=password]').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Invalid email or password');
  });
});

describe('Login - user remove inputs required attribute ', () => {
  beforeEach(() => {
    cy.visit('/users/login');
    cy.get('[type=email]').invoke('removeAttr', 'required');
    cy.get('[type=password]').invoke('removeAttr', 'required');
  });

  it('inputs should not have required attribute', () => {
    cy.get('[type=email]').should('not.have.attr', 'required');
    cy.get('[type=password]').should('not.have.attr', 'required');
  });

  it('show error message on empty email and password', () => {
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your email and password');
  });

  it('show error message on empty email', () => {
    cy.get('[type=password]').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your email and password');
  });

  it('show error message on empty password', () => {
    cy.get('[type=email]').type('email@gmail.com');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your email and password');
  });

  it("show error message on 'Space' as email and password", () => {
    cy.get('[type=email]').type(' ');
    cy.get('[type=password]').type(' ');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Enter your email and password');
  });
});

describe('Login - successfully ', () => {
  it('login successfully and redirect to tasks list', () => {
    cy.visit('/users/login');
    cy.get('[type=email]').type('correct@email.com');
    cy.get('[type=password]').type('correct');
    cy.get('button').click();
    cy.url().should('include', '/task');
  });
});
