<template>
  <el-form size="small"
           label-width="100px"
           :model="entity"
           :rules="rules"
           @submit.native.prevent
           ref="form">
    <el-form-item label="原密码:"
                  prop="oldPassword">
      <el-input v-model="entity.oldPassword"
                type="password"
                placeholder="请输入原密码"
                :maxlength="18" />
    </el-form-item>
    <el-form-item label="新密码:"
                  prop="newPassword">
      <el-input v-model="entity.newPassword"
                type="password"
                placeholder="请输入新密码"
                :maxlength="18" />
    </el-form-item>
    <el-form-item label="重复密码:"
                  prop="confirmPassword">
      <el-input v-model="entity.confirmPassword"
                type="password"
                placeholder="请重复新密码"
                :maxlength="18" />
    </el-form-item>
    <el-form-item label="">
      <p class="c-warning">修改密码成功后需重新登录</p>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary"
                 @click="submit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { FormMixin } from '@/mixins'
import { passwordValidator, reValueValidator } from '@/assets/js/validators'
import { ElForm } from 'element-ui/types/form'
// import { AccountApi } from '@/api/common/v1.0/accountApi'
import { adminInfoSession } from '@/storage/session/index'
// import AccountResetPasswrodParam from '@/api/common/v1.0/params/AccountResetPasswrodParam'

@Component
export default class UpdatePassword extends mixins(FormMixin) {
  // public entity: AccountResetPasswrodParam = {
  //   oldPassword: '',
  //   newPassword: '',
  //   confirmPassword: ''
  // }

  // public data() {
  //   return {
  //     rules: {
  //       oldPassword: [{ required: true, message: '请输入原密码' }],
  //       newPassword: [
  //         { required: true, message: '请输入新密码' },
  //         { validator: passwordValidator }
  //       ],
  //       confirmPassword: [
  //         { required: true, message: '请再次输入新密码' },
  //         {
  //           validator: reValueValidator(() => this.entity.newPassword),
  //           message: '两次输入新密码不一致'
  //         }
  //       ]
  //     }
  //   }
  // }

  // protected saveOrUpdate() {
  //   AccountApi.resetPasswrod(this.entity).then(() => {
  //     this.emitSubmit()
  //   })
  // }
}
</script>
