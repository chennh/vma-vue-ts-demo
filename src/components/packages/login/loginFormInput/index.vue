<template>
  <div class="login-form-input"
       :class="{active: isFocus}"
       @click="focus">
    <i class="icon"
       v-if="icon"
       :class="icon"></i>
    <div class="login-form-input-container">
      <input :type="type"
             :placeholder="placeholder"
             :maxlength="maxlength"
             v-model.trim="modelValue"
             @focus="onInputFocus"
             @blur="onInputBlur"
             @keyup.enter="onInputEnter"
             ref="input">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'

@Component
export default class LoginFormInput extends Vue {
  @Model('model', {
    type: String,
    default: ''
  })
  private value!: string

  @Prop({
    type: String,
    default: 'text'
  })
  private type!: string

  @Prop({
    type: String,
    default: ''
  })
  private icon!: string

  @Prop({
    type: String,
    default: ''
  })
  private placeholder!: string

  @Prop({
    type: Number,
    default: ''
  })
  private maxlength!: number

  // 文本框是否获得焦点
  private isFocus = false

  private get modelValue() {
    return this.value
  }
  private set modelValue(value: string) {
    this.emitModel(value)
  }

  // 输入框获得焦点
  public focus() {
    const inputRef = this.$refs.input as any
    inputRef.focus()
  }

  // 输入框文本选中
  public select() {
    const inputRef = this.$refs.input as any
    inputRef.select()
  }

  @Emit('model')
  private emitModel(value: string) {}
  @Emit('focus')
  private emitFocus() {}
  @Emit('blur')
  private emitBlur() {}
  @Emit('enter')
  private emitEnter() {}

  // 文本框获得焦点
  private onInputFocus() {
    this.isFocus = true
    this.emitFocus()
  }

  // 文本框失去焦点
  private onInputBlur() {
    this.isFocus = false
    this.emitBlur()
  }

  // 文本框enter
  private onInputEnter() {
    this.emitEnter()
  }
}
</script>
