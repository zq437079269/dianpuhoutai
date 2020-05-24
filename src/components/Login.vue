<template>
    <div class="login_container" >
        <div class="login_box" >
        <div class="avatar_box" >
            <img src="../assets/logo.png" alt="">
        </div>
            <el-form ref="login_fromref" :model="login_from" :rules="login_fromrules" class="login_form" label-width="0px">
            <el-form-item prop="username" >
                <el-input v-model="login_from.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
             <el-form-item prop="password">
                <el-input type="password" v-model="login_from.password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
             <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginform">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            login_from:{
                username:"admin",
                password:"123456"
            },
            login_fromrules:{
                username:[
                    { required: true, message: '请输入登录 名称', trigger: 'blur'},
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                ],
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur'},
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
      resetLoginform(){
          this.$refs.login_fromref.resetFields();
      },
      login(){
          this.$refs.login_fromref.validate(async valid => {
            if (!valid) return
            const { data: res } = await this.$http.post('login', this.login_from)
            // console.log(res)
            if (res.meta.status !== 200) return this.$message.error('登录失败！')
            this.$message.success('登录成功')
            window.sessionStorage.setItem("token", res.data.token)
            this.$router.push("/home")
          })
      }  
    }
}
</script>

<style lang="less" scoped>
.login_container{
    background:#2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50% , -50%);

    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solide #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform:translate(-50% , -50%);
        background-color: #ffffff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>