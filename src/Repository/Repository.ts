enum RepoList {
    MongoDB = "MongoDB",
    ElasticSearch = "ElasticSearch"
}

abstract class Repository {
    protected constructor(private _repoName: RepoList) {
    }

    GetRepoName = (): String => {
        return this._repoName
    }

    abstract TestConnection = async (): Promise<any> => {
    }
}

export {
    Repository,
    RepoList
}