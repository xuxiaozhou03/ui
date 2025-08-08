
  <template>
   <import src="./overlay.wxml" />

<root-portal wx:if="{{ rootPortal }}">
  <include src="./overlay.wxml" />
</root-portal>

<include wx:else src="./overlay.wxml" />

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      value: 300,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    lockScroll: {
      type: Boolean,
      value: true,
    },
    rootPortal: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },

    // for prevent touchmove
    noop() {},
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  