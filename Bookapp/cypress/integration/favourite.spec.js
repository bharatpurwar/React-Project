context("Favourite Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("john@gmail.com");
        cy.get("#password").type("1234567");
        cy.get("#button").click();
    });

    //checking if favourite page is displayed or not ==========================
    //=========================================================================
    it("Should check if writes 'My Favourites' in if click on favourite button", () => {
        //cy.wait(10000);
        cy.get("#navbarDropdownFavRec").click();
        cy.get("#favourite").click();
        cy.get("#favHeading").should("have.text", "My Favourites");
    });


    //checking if after deleting, does it delete the book========================
    //===========================================================================

    it("Should check if delete book on clicking on remove button", () => {
        //cy.wait(10000);
        cy.get("#navbarDropdownFavRec").click();
        cy.get("#favourite").click();
        cy.wait(1000);
        cy.get(".favButton").first().click();
        cy.wait(1000);
        cy.get("#success").should("have.text", "book deleted successfully");
    });


});