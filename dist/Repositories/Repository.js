"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repositories;
(function (Repositories) {
    let RepoList;
    (function (RepoList) {
        RepoList["MongoDB"] = "MongoDB";
        RepoList["ElasticSearch"] = "ElasticSearch";
    })(RepoList = Repositories.RepoList || (Repositories.RepoList = {}));
    class Repository {
        constructor(_repoName) {
            this._repoName = _repoName;
            this.GetRepoName = () => {
                return this._repoName;
            };
        }
    }
    Repositories.Repository = Repository;
})(Repositories || (Repositories = {}));
exports.default = Repositories;
