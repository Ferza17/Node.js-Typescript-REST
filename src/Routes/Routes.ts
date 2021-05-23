import express from "express";
import JwtMiddleware from "../Middleware/JWT/JwtMiddleware";

export abstract class Routes {

    protected constructor(protected app: express.Application, jwt: JwtMiddleware, protected name: string) {
    }

    getName = (): string => {
        return this.name
    }

    abstract initRoutes(): express.Application
}