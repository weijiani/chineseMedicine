<template>
  <div class="app-container">
    <el-table :data="dragList" border fit highlight-current-row @cell-click="editDrug">
      <el-table-column align="center" label="处方名称" width="150">
        <template slot-scope="scope">{{ scope.row.dragname }}</template>
      </el-table-column>
      <el-table-column label="药品成分" align="center">
        <template slot-scope="scope">{{ scope.row.ingredient }}</template>
      </el-table-column>
      <el-table-column label="用法" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.usage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="option='edit'">修改</el-button>
          <el-button size="mini" type="danger" @click="option='delete'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="处方模板" :visible.sync="drugDialogVisible" width="80%">
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
          <el-button type="primary" @click="modifiedSure">确定修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDragList, deleteDrug, uptateDrug } from "@/api/doctor";
import { getUserName } from "@/utils/auth";
import { Message } from "element-ui";
export default {
  data() {
    return {
      loading: false,
      dragList: [],
      option: "",
      drugDialogVisible: false,
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
  created() {
    this.getDragList();
  },
  mounted() {},
  methods: {
    // 获取药方模板
    getDragList() {
      getDragList({ username: getUserName() })
        .then(res => {
          this.dragList = res.data;
        })
        .catch(error => {
          console.log("getDragList", error);
          reject(error);
        });
    },
    editDrug(row) {
      if (this.option == "edit") {
        this.showEditDrug(row);
      } else if (this.option == "delete") {
        this.deleteDrug(row);
      } else {
        return;
      }
    },
    // 删除药方模板
    deleteDrug(data) {
      deleteDrug(data)
        .then(res => {
          if (res.data.resCode == 1) {
            Message({
              message: res.data.des,
              type: "success",
              duration: 3 * 1000
            });
            this.getDragList();
          }
        })
        .catch(error => {
          console.log("deleteDrug", error);
          reject(error);
        });
    },
    showEditDrug(data) {
      this.form = data;
      this.drugDialogVisible = true;
    },
    // 修改药方模板
    modifiedSure() {
      uptateDrug(this.form)
        .then(res => {
          if (res.data.resCode == 1) {
            Message({
              message: res.data.des,
              type: "success",
              duration: 3 * 1000
            });
            this.drugDialogVisible = false;
            this.getDragList();
          }
        })
        .catch(error => {
          console.log("uptateDrug", error);
          reject(error);
        });
    },
  }
};
</script>
<style lang="scss">
.has-gutter {
  .cell {
    color: rgb(25, 159, 241);
  }
}
</style>
