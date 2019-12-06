module.exports = class {
    async regist(){
        var {username,passwd} = this.paras;
        this.assert(username && (username=username.trim()),1,'username cant be empty');
        this.assert(passwd && (passwd=passwd.trim()),1,'passwd cant be empty');

        var result = await this.userService.registUser(username,passwd);
        console.log('====result===',result);
        if(!result.result)
            return {message:'regist faild!errCode is '+result.errCode};
        var user = result.data;
        await this.setUser(user);
        return {message:'regist succesed!',user};
    }

    async login(){
        // this.response.redirect(302, `/?message=${encodeURI('login succesed!')}`);
        var {username,passwd} = this.paras;
        this.assert(username && (username=username.trim()),1,'username cant be empty');
        this.assert(passwd && (passwd=passwd.trim()),1,'passwd cant be empty');
        var result = await this.userService.login(username,passwd);
        console.log('====result===',result);
        if(!result.result)
            return {message:'login faild!errCode is '+result.errCode};
        var user = result.data;
        await this.setUser(user);
        return {message:'login succesed!',user};
    }
}