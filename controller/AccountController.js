const UUID = require('uuid');

module.exports = class {
    async pay() {
        // console.log(this.adminName,this.adminReflexId)
        var {amount, reflexId} = this.paras;
        this.assert(amount && Number(amount) && Math.abs(amount) < 100, 1, 'the abs of amount must less than 100!');
        this.assert(this.user && this.user.username !== this.adminName,1,'u must login ! and cant be admin!')

        var uuid = UUID.v1();
        var orderId = `pay-test-demo-${uuid}`;
        var result = await this.accountService.paymentAndWaitResult(this.user.id, reflexId || ''
            , this.adminReflexId, (-Number(amount))+'', 'CNY', orderId, "pay-to-user-demo-test");

        this.response.redirect(302, `/?message=${encodeURI('pay orderId:' + orderId + ', result is :' + result)}`);
        return null;
    }

    async adjustment() {
        var {username, reflexId, amount} = this.paras;
        this.assert(username && (username = username.trim()), 1, 'username cant be empty');
        this.assert(amount && Number(amount) && Number(amount) > 0, 1, 'amount must be positive!');
        username !== this.adminName && this.assert(Number(amount) < 100, 1, 'amount must less than 100.00!');
        username === this.adminName && this.assert(Number(amount) < 10000, 1, 'amount must less than 100.00!');

        var user = await this.userService.findUserByKeyword(username);
        this.assert(user, 1, 'username cant be find!');
        var uuid = UUID.v1();
        var orderId = `adj-test-demo-${uuid}`;
        var result = this.accountService.adjustmentAndWaitResult(orderId, user.id, reflexId || ''
            , 'CNY', amount, "adjustment-to-user-demo-test");

        this.response.redirect(302, `/?message=${encodeURI('adjustment orderId:' + orderId + ', result is :' + result)}`);
        return null;
    }
}