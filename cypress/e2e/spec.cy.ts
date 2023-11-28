describe("e2e", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to latest page", () => {
    cy.url().should("include", "/latest");
    cy.contains("latest").should("exist");
    cy.contains("starred").should("exist");
    cy.contains("show more").should("exist");
    cy.get('[data-id="story"]').should("have.length", 12);
  });

  it("loades more stories", () => {
    cy.contains("show more").click();
    cy.get('[data-id="story"]').should("have.length", 24);
  });

  it("navigates to starred page", () => {
    cy.contains("starred").click();
    cy.url().should("include", "/starred");
  });

  it("saves a story", () => {
    cy.get('[data-id="story"]').first().contains("save").click();
    cy.contains("starred").click();
    cy.get('[data-id="story"]').should("have.length", 1);
  });
});
