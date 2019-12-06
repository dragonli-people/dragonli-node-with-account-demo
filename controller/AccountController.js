const UUID = require('uuid');

module.exports = class {
    async pay() {

        var {amount, reflexId} = this.paras;
        this.assert(amount && Number(amount) && Math.abs(amount) < 100, 1, 'the abs of amount must less than 100!');
        this.assert(this.user && this.user.username !== 'admin',1,'u must login ! and cant be admin!')

        var uuid = UUID.v1();
        var orderId = `pay-test-demo-${uuid}`;
        var result = await this.accountService.paymentAndWaitResult(this.user.id, reflexId || ''
            , 'GENERAL_RECEIVE', (-Number(amount))+'', 'CNY', orderId, "pay-to-user-demo-test");
        // await this.accountService.payment(this.user.id, reflexId || '', 'GENERAL_RECEIVE', (-Number(amount))+'', 'CNY', orderId,
        //     "pay-to-user-demo-test", false);
        // var result = null;
        // for (var i = 0; i < 100; i++) {
        //     await this.sleep(32);
        //     var {status} = await this.accountService.paymentStatus(orderId);
        //     if (status === 'SUCCESS' || status === 'FAILED') {
        //         result = status;
        //         break;
        //     }
        // }
        this.response.redirect(302, `/?message=${encodeURI('pay orderId:' + orderId + ', result is :' + result)}`);
        return null;
    }

    async adjustment() {
        var {username, reflexId, amount} = this.paras;
        this.assert(username && (username = username.trim()), 1, 'username cant be empty');
        this.assert(amount && Number(amount) && Number(amount) > 0, 1, 'amount must be positive!');
        username !== 'admin' && this.assert(Number(amount) < 100, 1, 'amount must less than 100.00!');
        username === 'admin' && this.assert(Number(amount) < 10000, 1, 'amount must less than 100.00!');

        var user = await this.userService.findUserByKeyword(username);
        this.assert(user, 1, 'username cant be find!');
        var uuid = UUID.v1();
        var orderId = `adj-test-demo-${uuid}`;
        var result = this.accountService.adjustmentAndWaitResult(orderId, user.id, reflexId || ''
            , 'CNY', amount, "adjustment-to-user-demo-test");
        // await this.accountService.accountAdjustment(orderId, user.id, reflexId || '', 'CNY', amount,
        //     "adjustment-to-user-demo-test");
        // var result = null;
        // for (var i = 0; i < 100; i++) {
        //     await this.sleep(32);
        //     var {status} = await this.accountService.adjustmentStatus(orderId);
        //     if (status === 'SUCCESS' || status === 'FAILED') {
        //         result = status;
        //         break;
        //     }
        // }
        this.response.redirect(302, `/?message=${encodeURI('adjustment orderId:' + orderId + ', result is :' + result)}`);
        return null;
    }
}