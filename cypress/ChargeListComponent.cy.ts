import { ToastrService } from "ngx-toastr";
import { ChargeListComponent } from "src/app/components/charges/charge-list/charge-list.component"
import { AuthService } from "src/app/services/auth.service";

describe('ChargeListComponent.cy.ts', () => {
  it('playground', () => {
    cy.mount(
      ChargeListComponent, {
        providers: [
          AuthService,
          ToastrService
        ]
      }
    )
    .then(() => {
      cy.get('submit').click();
      cy.get('getData').should('have.been.calledWith', 1);
    });
  })
})