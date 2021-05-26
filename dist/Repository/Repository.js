"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoList = exports.Repository = void 0;
var RepoList;
(function (RepoList) {
    RepoList["MongoDB"] = "MongoDB";
    RepoList["ElasticSearch"] = "ElasticSearch";
})(RepoList || (RepoList = {}));
exports.RepoList = RepoList;
class Repository {
    constructor(_repoName) {
        this._repoName = _repoName;
        this.GetRepoName = () => {
            return this._repoName;
        };
    }
}
exports.Repository = Repository;
