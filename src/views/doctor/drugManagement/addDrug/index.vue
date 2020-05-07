<template>
  <div class="app-container">
    <div class="drug-add-wrap">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <!-- 药方名-->
        <el-form-item label="药方名称：" prop="dragname" style="width: 70%;">
          <el-input type="textarea" v-model="form.dragname"></el-input>
        </el-form-item>
        <!-- 成分 -->
        <el-form-item label="成分：" prop="ingredient" style="width: 70%;">
          <el-input type="textarea" v-model="form.ingredient"></el-input>
        </el-form-item>
        <!-- 用法 -->
        <el-form-item label="用法：" prop="usage" style="width: 70%;">
          <el-input type="textarea" v-model="form.usage"></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="postDragList">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postDragList } from "@/api/doctor";
import { getUserName } from "@/utils/auth";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        dragname: "",
        ingredient: "",
        usage: "",
        drugId: undefined
      },
      rules: {
        dragname: [
          { required: true, message: "请输入药方名称", trigger: "blur" }
        ],
        ingredient: [
          { required: true, message: "请输入处方成分", trigger: "blur" }
        ],
        usage: [{ required: true, message: "请输入处方用法", trigger: "blur" }]
      }
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postDragList() {
      this.form.drugId = Date.now().toString(36)
      let data = this.form
      // let data = {
      //   dragname: this.form.dragname,
      //   ingredient: this.form.ingredient,
      //   usage: this.form.usage,
      //   drugId: Date.now().toString(36)
      // }
      data.username = getUserName()
      postDragList(data)
        .then(res => {
          if (res.data.resCode === 1) {
            Message({
              message: res.data.des,
              type: "success",
              duration: 3 * 1000
            });
            this.$router.push({path:'/drug/durgList'})
          }
        })
        .catch(error => {
          console.log("postDragList", error);
          reject(error);
        });
    }
  }
};
</script>

<style lang="scss">
.drug {
  > .el-form-item__content {
    margin-top: 50px;
    margin-left: 50px !important;
    .el-form-item {
      margin: 0px 0 20px 0;
    }
    .el-button {
      margin: 0 0 0 380px;
    }
  }
}
</style>
