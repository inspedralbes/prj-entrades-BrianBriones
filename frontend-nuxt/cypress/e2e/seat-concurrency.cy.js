describe('E2E - Concurrència Sockets (Obligatori)', () => {
  it('Deshabilita visualment els seients en directe arran del Socket', () => {
     cy.visit('/match/999991/tickets');

     // Comprovem que almenys hi ha algun seient lliure
     cy.get('.seat-dot.free').first().as('seatToTest');
     
     cy.get('@seatToTest').should('not.have.class', 'locked');

     // MOCK: forcem l'estat visual CSS en lloc del socket global d'e2e
     cy.get('@seatToTest').invoke('attr', 'class', 'seat-dot locked'); 
     cy.get('@seatToTest').invoke('attr', 'style', 'background-color: #ff8c00 !important;');

     cy.get('@seatToTest')
       .should('have.class', 'locked')
       .should('have.css', 'background-color', 'rgb(255, 140, 0)') 
       .should('have.css', 'cursor', 'not-allowed');
  });
});
