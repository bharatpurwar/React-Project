context("Login Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });

    //checking in login page after filling username and password===========
    //=====================================================================
    it("Should check for wrong credentials", () => {
        cy.get("#email").type("admin");
        cy.get("#password").type("71548715");
        cy.get("#button").click();
        cy.wait(1000);
        cy.get("#error").should("have.text", "invalid username or password");
        
    });

    it("Should check for missing credentials", () => {
        cy.get("#button").click();
        cy.wait(1000);
        cy.get("#error").should("have.text", "email or password missing");
        
    });

    it("Should check for correct credentials", () => {
        cy.get("#email").type("john@gmail.com");
        cy.get("#password").type("1234567");
        cy.get("#button").click();
        cy.wait(1000);
        cy.get("#welcomeText").should("have.text", "Welcome, John");
    });

    

});