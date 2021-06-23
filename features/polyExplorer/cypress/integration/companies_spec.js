import { navigation } from "../helpers";

const INDEX_ROUTE = "dist/index.html";

describe("Companies", () => {
    beforeEach(() => {
        cy.visit(INDEX_ROUTE);
        cy.get(".button-container button")
            .click()
            .then(() => {
                return cy
                    .get(
                        ".swiper-slide.swiper-slide-active .data-sharing-section.companies-shared .data-sharing-gauge"
                    )
                    .click();
            });
    });

    it(`should move to the next slide doing click on the screen`, () => {
        navigation(
            0,
            (slide) =>
                !slide.children(
                    ".swiper-slide.swiper-slide-active .slide-tap-target"
                ).length,
            (index) => {
                return cy.wait(1000).then(() => {
                    cy.matchImageSnapshot(`companies${index}`);
                    return cy
                        .get(
                            ".swiper-slide.swiper-slide-active .slide-tap-target"
                        )
                        .click();
                });
            }
        );
    });

    it(`should move to the next slide doing click on the down-button`, () => {
        navigation(
            0,
            (slide) => slide.children(".jurisdiction-tree-container").length,
            (index) =>
                cy.wait(1000).then(() => {
                    cy.matchImageSnapshot(`companies${index}`);
                    return cy.get(".down-button").click();
                })
        );
    });

    it(`should move to the next slide doing swipe up on the screen`, () => {
        navigation(
            0,
            (slide) => slide.children(".jurisdiction-tree-container").length,
            (index) =>
                cy.wait(1000).then(() => {
                    cy.matchImageSnapshot(`companies${index}`);
                    return cy
                        .get(".swiper-slide.swiper-slide-active")
                        .trigger("pointerdown", "bottom", { which: 1 })
                        .trigger("pointermove", "center")
                        .trigger("pointerup", { force: true });
                })
        );
    });

    it(`should move to the info screen if we click on "How to read this" button`, () => {
        navigation(
            0,
            (slide) => slide.children(".jurisdiction-tree-container").length,
            (index) =>
                cy.get(".static-content").then(($staticContent) => {
                    if (
                        $staticContent.children(".data-sharing-legend").length
                    ) {
                        cy.get(".swiper-slide.swiper-slide-active").invoke(
                            "css",
                            "display",
                            "none"
                        );
                        return cy
                            .get(".static-content .data-sharing-legend")
                            .click()
                            .then(() => {
                                cy.matchImageSnapshot(`companiesinfo${index}`);
                                return cy.get("button").click();
                            })
                            .then(() => {
                                return cy.get(".down-button").click();
                            });
                    } else {
                        return cy.get(".down-button").click();
                    }
                })
        );
    });
});
