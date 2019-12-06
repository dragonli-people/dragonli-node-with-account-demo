module.exports = class {
    async index(){
        this.paras.message = this.paras.message || '';
        this.paras.user = this.user;
        return this.paras;
    }
}