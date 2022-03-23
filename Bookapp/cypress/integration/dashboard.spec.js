context("Dashboard Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    //checking in dashboard page before loging in==========================
    //=====================================================================
    it("Should check if writes not logged in if click on favourite button", () => {
        cy.wait(10000);
        cy.get(".favouriteBtn").first().click();
        cy.get("#error").should("have.text", "not logged in");
    });

    it("Should check if writes not logged in if click on recommend button", () => {
        cy.wait(10000);
        cy.get(".recommendBtn").first().click();
        cy.get("#error").should("have.text", "not logged in");
    });

    //checking if after logging in, does it display books have been added or not
    //===========================================================================

    it("Should check if clicking on favourite button after logging in", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("john@gmail.com");
        cy.get("#password").type("1234567");
        cy.get("#button").click();
        cy.wait(10000);
        cy.get(".favouriteBtn").first().click();
        
        cy.get("#error").should("have.text", "book already added in favourite");
    });

    it("Should check if clicking on recommend button after logging in", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("john@gmail.com");
        cy.get("#password").type("1234567");
        cy.get("#button").click();
        cy.wait(10000);
        cy.get(".recommendBtn").first().click();
        
        cy.get("#error").should("have.text", "book already added in recommendation");
    });


});