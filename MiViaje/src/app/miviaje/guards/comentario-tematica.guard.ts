import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, Router } from "@angular/router";

export const comentarioTematicaGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
    const tematica = +route.params['tematica'];
  if (isNaN(tematica) || tematica < 1) {
    return inject(Router).createUrlTree(['/viaje']);
  }
  return true;
};
