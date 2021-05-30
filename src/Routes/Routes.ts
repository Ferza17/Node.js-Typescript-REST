import express from "express";

namespace Routes {
    export abstract class Route {

        protected constructor(protected app: express.Application, protected name: string) {
        }

        GetRoute = (): string => {
            return this.name
        }

        abstract initRoutes(): express.Application
    }

    export enum RoutesList {
        Product = "/products",
        User = "/users"
    }
}


export default Routes