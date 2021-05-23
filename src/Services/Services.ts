import {MongoDB} from "../Repository/MongoDB/MongoDB";

export abstract class Services {
    protected constructor(mongoDB: MongoDB) {
    }
}