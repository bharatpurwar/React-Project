context("SearchBar Testing E2E Test Cases", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    
    it("Should check if writes 'search box is empty' if click on Search button", () => {
        
        cy.get("#searchButton").click();
        cy.get("#error").should("have.text", "search box is empty");
    });


    it("Should check if it gets data on click on Search button for author name patrick", () => {
        cy.get("#typeOfSource").select("author");
        cy.get("#searchField").type("patrick");
        cy.get("#searchButton").click();
        cy.wait(15000);
        cy.get("#searchHeading").should("have.text", "ADVANCED SEARCH");
    });
    


});