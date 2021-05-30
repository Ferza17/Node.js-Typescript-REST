namespace Repositories {
    export enum RepoList {
        MongoDB = "MongoDB",
        ElasticSearch = "ElasticSearch"
    }

    export abstract class Repository {
        protected constructor(private _repoName: RepoList) {
        }

        GetRepoName = (): String => {
            return this._repoName
        }

        abstract TestConnection = async (): Promise<any> => {
        }
    }
}

export default Repositories