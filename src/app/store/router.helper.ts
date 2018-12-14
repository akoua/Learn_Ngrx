import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface MyRouterState{
    url: string;
    params: Params;
    queryParams: Params;
}

export class MyRouteStateSerializer implements RouterStateSerializer<MyRouterState> {

    serialize(routerState: RouterStateSnapshot): MyRouterState{
        //on deconstruit l'objet
        const {url} = routerState;
        const {queryParams} = routerState.root; //eux ils se situe tout en haut de la chaîne
        
        //les params sont tout en bas de la chaine dc nous allons parcourir toutes les routes
        //jsq avoir la dernière stack de route
        let state_all_route:ActivatedRouteSnapshot = routerState.root;
        while (state_all_route.firstChild) {
            state_all_route = state_all_route.firstChild;
        }

        const {params} = state_all_route;

        return { url, params, queryParams};

    }
}