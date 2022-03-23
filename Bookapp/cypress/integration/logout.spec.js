context("LogOut Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("john@gmail.com");
        cy.get("#password").type("1234567");
        cy.get("#button").click();
    });

    it("checking if logout works or not", () => {
        cy.get("#logOut").click();
        cy.wait(1000);
        cy.get("#headerTitle").should("have.text", "Login");
    });

});