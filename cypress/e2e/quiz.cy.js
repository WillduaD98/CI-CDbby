
describe('Quiz App E2E', () => {
    it('loads quiz and completes with correct answers', () => {
      cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
  
      cy.visit('http://localhost:3000'); // ⚠️ Asegúrate de que el frontend corre en este puerto
      cy.contains('Start Quiz', { timeout: 10000 }).should('exist').click();
      cy.wait('@getQuestions');
  
      cy.contains('What is the output of print(2 ** 3)?').should('exist');
      cy.contains('8').prev('button').click();
  
      cy.contains("What is the output of len('hello world')?").should('exist');

      cy.get('.d-flex.align-items-center.mb-2').each(($el) => {
        const text = $el.find('.alert.alert-secondary').text().trim();
        if (text === '11') {
          cy.wrap($el).find('button').click();
        }
      });
      
      cy.contains('Quiz Completed', { timeout: 5000 }).should('exist');
      cy.contains('Your score: 2/2').should('exist');
    });
  });
    