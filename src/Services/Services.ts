import MongoDB from "../Repository/MongoDB/MongoDB";

export default abstract class Services {
    protected constructor(mongoDB: MongoDB) {
    }
}