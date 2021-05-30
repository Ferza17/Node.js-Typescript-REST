import MongoDB from "../Repositories/MongoDB/MongoDB";

export default abstract class Services {
    protected constructor(_mongoDB: MongoDB) {
    }
}