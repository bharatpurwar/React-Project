context("Recommend Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("john@gmail.com");
        cy.get("#password").type("1234567");
        cy.get("#button").click();
    });

    //checking if recommend page is displayed or not ==========================
    //=========================================================================
   

    it("Should check if writes 'My Recommendation' in if click on recommend button", () => {
        //cy.wait(10000);
        cy.get("#navbarDropdownFavRec").click();
        cy.get("#recommend").click();
        cy.get("#recHeading").should("have.text", "My Recommendation");
    });

    //checking if after deleting, does it delete the book========================
    //===========================================================================

    it("Should check if delete book on clicking on remover button", () => {
        //cy.wait(10000);
        cy.get("#navbarDropdownFavRec").click();
        cy.get("#recommend").click();
        cy.wait(1000);
        cy.get(".favButton").first().click();
        cy.get("#success").should("have.text", "book deleted successfully");
    });

})
