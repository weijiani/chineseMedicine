<template>
<div class="patient-detail-wrap">
  <p class="title">个人信息</p>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 姓名 -->
    <el-form-item label="姓名" prop="name" style="width: 70%;">
        <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <!-- 年龄 -->
    <el-form-item label="年龄" prop="age" style="width: 70%;">
        <el-input  v-model.number="ruleForm.age" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 出生日期 --> 
    <el-form-item prop="birthData" label="出生日期">
        <el-date-picker
        v-model="ruleForm.birthData"
        type="date"
        placeholder="选择日期">
        </el-date-picker>
    </el-form-item>
       
    <!-- 性别 -->
    <el-form-item label="性别" prop="sex">
    <el-select v-model="ruleForm.sex" placeholder="请选择性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
    <!-- 联系方式 -->
    <el-form-item label="手机号" prop="telNumber" style="width: 70%;">
        <el-input v-model.number="ruleForm.telNumber" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 地址 -->
     <el-form-item label="现居住地" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
    </el-form-item>
    <!-- 提交 -->
    <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm',false)" ref="uptate" :disabled='newSubmit'>更新</el-button>
        <el-button type="primary" @click="submitForm('ruleForm',true)" ref="submit" :disabled ='!newSubmit'>提交</el-button>
    </el-form-item>
</el-form>
</div>
    
</template>

<script>
import { getUserName, getRole } from '@/utils/auth'
import { Message } from 'element-ui'
import { postUserDetail,getUserDetail } from '@/api/patient'

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          age: '',
          birthData: "",//new Date('Sun Apr 05 2020 00:00:00 GMT+0800').toLocaleDateString()
          sex: '',
          telNumber: '',
          region: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
           birthData: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
           sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          telNumber: [
              { required: true, message: '手机号不能为空'},
          ],
          region: [
              { required: true, message: '地址不能为空'},
          ]
        },
        newSubmit: true
      };
    },
    mounted(){
      this.getUserDetail()
    },
    methods: {
      submitForm(formName,flag) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.submitHandle(flag)
          } else {
            return false;
          }
        });
      },
      getUserDetail(){
        let postData = {
            username: getUserName(),
            role: getRole(),
        }
        getUserDetail(postData).then(res => {
            let userDetail = res.data.userDetail
            if( userDetail.length == 0){
                this.newSubmit = true
            }else{
                this.ruleForm =  userDetail[0]
                this.newSubmit = false
            }
            }).catch(error => {
                console.log('getUserDetail', error)
                reject(error)
            })
      },
      submitHandle(flag){
        //   flag为true，表示更新数据
        let otherData = {
            username: getUserName(),
            role: getRole(),
            newSubmit: flag
        }
        let postData = Object.assign(this.ruleForm, otherData)
        postUserDetail(postData).then(res => {
            this.getUserDetail()
           if(res.data.resCode){
                Message({
                message: res.data.des,
                type: 'success',
                duration: 3 * 1000
            })
           }else{
               Message({
                message: res.data.des,
                type: 'error',
                duration: 3 * 1000
           })
         }
        }).catch(error => {
            console.log('userDetail', error)
            reject(error)
        })
          
         
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss" scoped>
    .patient-detail-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
            font-size: 25px;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            .title-dep-name{
                color: lightseagreen;
            }
        }
    }
</style>
<style lang="scss">
    .el-form{
        width: 420px;
    }
</style>