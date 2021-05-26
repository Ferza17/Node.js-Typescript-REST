import express from "express";


enum RoutesList {
    Product = "/products",
    User = "/users"
}

abstract class Routes {

    protected constructor(protected app: express.Application, protected name: string) {
    }

    GetRoute = (): string => {
        return this.name
    }

    abstract initRoutes(): express.Application
}

export {Routes, RoutesList}