"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoList = exports.Repository = void 0;
var RepoList;
(function (RepoList) {
    RepoList["MongoDB"] = "MongoDB";
    RepoList["ElasticSearch"] = "ElasticSearch";
})(RepoList || (RepoList = {}));
exports.RepoList = RepoList;
var Repository = /** @class */ (function () {
    function Repository(_repoName) {
        var _this = this;
        this._repoName = _repoName;
        this.GetRepoName = function () {
            return _this._repoName;
        };
    }
    return Repository;
}());
exports.Repository = Repository;
