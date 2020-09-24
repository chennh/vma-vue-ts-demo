<template>
  <div>
    {{title}}
  </div>
</template>
<script lang="ts">
import { ref } from '@vue/composition-api'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  setup() {
    const title = ref('名称')
    return {
      title,
    }
  },
})
export default class Composition extends Vue {}
</script>
