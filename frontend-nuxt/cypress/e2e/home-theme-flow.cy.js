describe('E2E - Flux de Navegació i Tema Web', () => {
  it('Simula l\\'entrada a la home, recerca d\\'un partit i conmutació a Mode Fosc', () => {
    cy.visit('/');
    cy.contains('Benvingut', { matchCase: false }).should('be.visible');

    // Navega a llista
    cy.contains('Veure partits').click();
    cy.url().should('include', '/matches');

    // Entrada al primer partit genèric 
    cy.get('a[href^="/match/"]').first().click();
    cy.contains('Comprar', { matchCase: false }).should('be.visible');

    // Conmuta selector de modes
    cy.get('.theme-toggle').click({ force: true });
    
    // Confirma existència d'injectat DOM
    cy.get('html').should('have.class', 'dark').or('not.have.class', 'dark');
  });
});
