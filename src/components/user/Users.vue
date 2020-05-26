<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
            <el-col :span="9">
                <el-input clearable v-model="queryInfo.query" @clear="getUserList" >
                <el-button slot="append" icon="el-icon-search" @click="getUserList" ></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addDialog = true" >添加用户</el-button>        
            </el-col>
            </el-row>
            <el-table
            :data ="userList"
            border
            stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column
                prop="username"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="role_name"
                label="角色">
                </el-table-column>
                <el-table-column
                label="状态">
                <template slot-scope="scope" >
                    <el-switch
                    v-model="scope.row.mg_state"
                    @change="userStateChange(scope.row)">
                    </el-switch>
                </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope" >
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEditDialog(scope.row.id)" ></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeUser(scope.row.id)" ></el-button>
                     <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                    <el-button type="warning" icon="el-icon-setting" circle size="mini" @click="change(scope.row)"></el-button>
                    </el-tooltip>
                </template>
                </el-table-column>
            </el-table>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
        </el-card>
        <!-- 添加用户 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addDialog"
            width="50%"
            @close="addDialogClose">
            <el-form :model="addForm" :rules="addFormRule" ref="addFormRef" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户信息 -->
        <el-dialog
            title="修改用户信息"
            :visible.sync="editDialog"
            width="50%"
            @close="editDialogClose"
            >
            <el-form :model="editForm" :rules="editFormRule" ref="editFormRef" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="editForm.username" disabled ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配角色 -->
        <el-dialog title="分配角色" :visible.sync="xianshifenpeikuang" width="50%" @close="guanbitankuang">
      <div>
        <p>当前的用户：{{beifenpeijiaosexinxi.username}}</p>
        <p>当前的角色：{{beifenpeijiaosexinxi.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="yixuanjueseID" placeholder="请选择">
            <el-option v-for="item in jueseshujuliebiao" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xianshifenpeikuang = false">取 消</el-button>
        <el-button type="primary" @click="quedingxiugai">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

        if (regEmail.test(value)) {
            // 合法的邮箱
            return cb()
        }

        cb(new Error('请输入合法的邮箱'))
        }
            // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

        if (regMobile.test(value)) {
            return cb()
        }

        cb(new Error('请输入合法的手机号'))
        }

        return{
        queryInfo:{
            query:'',
            pagenum: 1,
            pagesize: 2
        },
        userList:[],
        total: 0,
        addDialog: false,
        editDialog: false,
        addForm:{
            username:'',
            password:'',
            email:'',
            mobile:''
        },
        addFormRule:{
            username:[    
            { required: true, message: '请输入合法用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
            { required: true, message: '请输入合法密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            email:[
            { required: true, message: '请输入合法邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' } 
            ],
            mobile:[
            { required: true, message: '请输入合法手机号', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' } 
            ]
            
        },
        editForm:{

        },
        editFormRule:{
            email:[
            { required: true, message: '请输入合法邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' } 
            ],
            mobile:[
            { required: true, message: '请输入合法手机号', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' } 
            ]
        },
        xianshifenpeikuang:false,
        beifenpeijiaosexinxi:{},
        jueseshujuliebiao:[],
        yixuanjueseID:''
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
           const{data:res} = await this.$http.get('users',{params:this.queryInfo})
            if(res.meta.status !== 200){
                return this.$message.error('获取用户列表错误');
                
            }
            // console.log(res.data.users)
            this.userList = res.data.users
            this.total = res.data.total
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
       async userStateChange(userInfo){
           const {data:res} =  await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
           if(res.meta.status !==200){
               userInfo.mg_state = !userInfo.mg_state
               return this.$message.error('更新用户状态失败')
           }
           this.$message.success('更新用户状态成功')
        },
        addDialogClose(){
            this.$refs.addFormRef.resetFields()
        },
        editDialogClose(){
            this.$refs.editFormRef.resetFields()
        },
        addUser(){
            this.$refs.addFormRef.validate( async valid=>{
                if(!valid) return
                const {data:res} = await this.$http.post('users' , this.addForm)
                if(res.meta.status !==201){
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                this.addDialog = false
                this.getUserList()
            })
        },
         async showEditDialog(id){
             this.editDialog = true
            const{data:res} =  await this.$http.get('users/'+ id)
            if(res.meta.status !==200){
             return this.$message.error('查询用户信息失败')
            }
            this.editForm = res.data
            this.editDialogVisible = true
            
            },
            editUser(){
                 this.$refs.editFormRef.validate( async valid=>{
                if(!valid) return
                const{data:res} = await this.$http.put('users/' + this.editForm.id , { email: this.editForm.email, mobile: this.editForm.mobile })
                   if(res.meta.status !==200){
                       return this.$message.error('更新用户信息失败')
                   } 
                   this.editDialog = false
                   this.getUserList()
                   this.$message.success('更新用户信息成功')
            })
            },
            async removeUser(id){
                const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).catch(err => err)
                
                // 如果用户确认删除，则返回值为字符串 confirm
                // 如果用户取消了删除，则返回值为字符串 cancel
                // console.log(confirmResult)
                if(confirmResult !=='confirm'){
                    return this.$message.info('已取消删除')
                }
                // this.$message.success('删除成功')
                const {data: res} = await this.$http.delete('users/' + id )
                if(res.meta.status !== 200){
                    return this.$message.error('删除用户失败')
                }
                this.$message.success('删除用户成功')
                this.getUserList()
                // this.queryInfo.pagenum = 1
            },
            async change(value) {
            this.beifenpeijiaosexinxi = value

            // 在展示对话框之前，获取所有角色的列表
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败！')
            }

            this.jueseshujuliebiao = res.data

            this.xianshifenpeikuang = true
            },
        // 点击按钮，分配角色
        async quedingxiugai() {
        if (!this.yixuanjueseID) {
            return this.$message.error('请选择要分配的角色！')
        }

        const { data: res } = await this.$http.put(
            `users/${this.beifenpeijiaosexinxi.id}/role`,
            {
            rid: this.yixuanjueseID
            }
        )

        if (res.meta.status !== 200) {
            return this.$message.error('更新角色失败！')
        }

        this.$message.success('更新角色成功！')
        this.getUserList()
        this.xianshifenpeikuang = false
        },
        // 监听分配角色对话框的关闭事件
        guanbitankuang() {
        this.yixuanjueseID = ''
        this.beifenpeijiaosexinxi = {}
        }

        }
        
}
</script>
<style lang="less" scoped>

</style>