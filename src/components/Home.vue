<template>
            <el-container class="home_container" >
            <el-header>
                <div>
                    <img src="../assets/heima.png" alt="">
                    <span>后台管理系统</span>
                </div>
                <el-button type='info' @click="logout" >退出</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px' : '200px'"  >
                    <div class='toggle-button' @click="toggleCollapse" >|||</div>
                <el-menu :unique-opened='true'
                :collapse="isCollapse"
                :collapse-transition='false'
                :router="true"
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409eff"
                :default-active="activePath">
                <!-- 一级菜单 -->
                <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id" >
                    <!-- 一级菜单摸板区域 -->
                    <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-location"></i>
                    <!-- 文本 -->
                    <span>{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item 
                    :index="'/' + subItem.path " 
                    v-for="subItem in item.children" 
                    :key="subItem.id"
                    @click="saveNavState('/' + subItem.path)"
                     >
                         <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 文本 -->
                    <span>{{subItem.authName}}</span>
                    </template>
                    </el-menu-item>
                </el-submenu>
                </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            </el-container>
                   

</template>

<script>
export default {
    data(){
        return{
            menulist:[],
            isCollapse:false,
            activePath:''
        }
    },
    created(){
        this.getMenuList(),
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
       async getMenuList(){
            const { data:res }= await this.$http.get('menus')
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
        },
        toggleCollapse(){
            this.isCollapse =!this.isCollapse
        },
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath', activePath )
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
    span{
        margin-left: 15px;
    }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: #eaedf1;
}
.home_container{
    height: 100%;
}
.toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor:pointer
}

</style>