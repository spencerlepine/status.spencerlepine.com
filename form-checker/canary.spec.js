/**
 * Enter the data-testid for each form element (if it exists)
 *
 * <form data-testid="yeet">
 *  <input type="text" data-testid="contact-form-name-input" name="name"><br>
 *  <input type="text" data-testid="contact-form-email-input" name="email"><br>
 *  <input type="text" data-testid="contact-form-message-input" name="message"><br>
 *  <input type="submit" data-testid="contact-form-submit-btn" />
 * </form>
 */

const config = {
  contactPageUrl: 'https://www.spencerlepine.com/#contact',
  nameInputDataTestId: 'contact-form-name-input',
  emailInputDataTestId: 'contact-form-email-input',
  messageInputDataTestId: 'contact-form-message-input',
  submitBtnDataTestId: 'contact-form-submit-btn',
};

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

describe('Contact form submission', () => {
  it('should fill out the form and submit it', () => {
    cy.visit(config.contactPageUrl);

    // Generate random data
    const randomName = `CanaryName_${getRandomString(5)}`;
    const randomEmail = `${getRandomString(8)}@example.com`;
    const randomMessage = `Portfolio Contact Form message: ${getRandomString(20)}`;

    // Fill out the form fields
    cy.get(`[data-testid="${config.nameInputDataTestId}"]`).type(randomName);
    cy.get(`[data-testid="${config.emailInputDataTestId}"]`).type(randomEmail);
    cy.get(`[data-testid="${config.messageInputDataTestId}"]`).type(randomMessage);

    // Submit the form
    cy.get(`[data-testid="${config.submitBtnDataTestId}"]`).click();

    // Verify that the success message appears
    cy.contains('We\'ll be in touch soon.', { timeout: 5000 }).should('be.visible');

    // Wait for page to load after submission
    cy.wait(4000);
  });
});
