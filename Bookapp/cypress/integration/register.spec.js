context("Register Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/register");
    });

    //hold the scroll bar down so that cypress can take snapshot, otherwise it gives 
    //error=========================================================================
    it("checking if Register is displayed", () => {
        cy.get("#register").click();
        cy.wait(1000);
        cy.get("#headerTitle").should("have.text", "Register");
    });

    it("Should check for missing fields", () => {
        cy.get("#button").click();
        
        cy.get("#error").should("have.text", "some fields missing");
    });

    it("Should check for wrong type of password (not containing a letter)", () => {
        cy.get("#firstname").type("rajesh");
        cy.get("#lastname").type("gupta");
        cy.get("#city").type("kanpur");
        cy.get("#email").type("rajesh@gmail.com");
        cy.get("#age").type("51");
        cy.get("#password").type("71548715");
        cy.get("#button").click();
        
        cy.get("#error").should("have.text", "Your password must contain at least one letter.");
    });

    it("Should check for wrong type of email", () => {
        cy.get("#firstname").type("rajesh");
        cy.get("#lastname").type("gupta");
        cy.get("#city").type("kanpur");
        cy.get("#email").type("rajesh65fhj");
        cy.get("#age").type("51");
        cy.get("#password").type("71548715");
        cy.get("#button").click();
        
        cy.get("#error").should("have.text", "You have entered an invalid email address!");
    });

    it("Should check for wrong age", () => {
        cy.get("#firstname").type("rajesh");
        cy.get("#lastname").type("gupta");
        cy.get("#city").type("kanpur");
        cy.get("#email").type("rajesh@gmail.com");
        cy.get("#age").type("510");
        cy.get("#password").type("71548715a");
        cy.get("#button").click();
        
        cy.get("#error").should("have.text", "invalid age");
    });

});