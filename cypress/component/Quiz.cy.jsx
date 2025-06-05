import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../../client/src/components/Quiz';

describe('Quiz Component', () => {
  it('renders start button and loads a question after click', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' })


    mount(<Quiz />);

    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.contains('What is the output of print(2 ** 3)?').should('exist');
    cy.contains('8').should('exist');
  });
});

// import Quiz from "../../client/src/components/Quiz"

// describe('Quiz Component', () => {
//   beforeEach(() => {
//     cy.intercept({
//         method: 'GET',
//         url: '/api/questions/random'
//       },
//       {
//         fixture: 'questions.json',
//         statusCode: 200
//       }
//       ).as('getRandomQuestion')
//     });

//   it('should start the quiz and display the first question', () => {
//     cy.mount(<Quiz />);
//     cy.get('button').contains('Start Quiz').click();
//     cy.get('.card').should('be.visible');
//     cy.get('h2').should('not.be.empty');
//   });

//   it('should answer questions and complete the quiz', () => {
//     cy.mount(<Quiz />);
//     cy.get('button').contains('Start Quiz').click();

//     // Answer questions
//     cy.get('button').contains('1').click();

//     // Verify the quiz completion
//     cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
//   });

//   it('should restart the quiz after completion', () => {
//     cy.mount(<Quiz />);
//     cy.get('button').contains('Start Quiz').click();

//     // Answer questions
//     cy.get('button').contains('1').click();

//     // Restart the quiz
//     cy.get('button').contains('Take New Quiz').click();

//     // Verify the quiz is restarted
//     cy.get('.card').should('be.visible');
//     cy.get('h2').should('not.be.empty');
//   });
// });
