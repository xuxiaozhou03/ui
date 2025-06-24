<template>
  <demo-block title="基本用法">
    <van-checkbox v-model="checkbox1" class="demo-checkbox">
      复选框
    </van-checkbox>
  </demo-block>

  <demo-block title="禁用状态">
    <van-checkbox v-model="checkboxDisabled1" disabled class="demo-checkbox">
      复选框
    </van-checkbox>
    <van-checkbox v-model="checkboxDisabled2" disabled class="demo-checkbox">
      复选框
    </van-checkbox>
  </demo-block>

  <demo-block title="自定义形状">
    <van-checkbox v-model="checkboxShape" shape="square" class="demo-checkbox">
      复选框
    </van-checkbox>
  </demo-block>

  <demo-block title="自定义颜色">
    <van-checkbox
      v-model="checkbox2"
      checked-color="#07c160"
      class="demo-checkbox"
    >
      复选框
    </van-checkbox>
  </demo-block>

  <demo-block title="自定义大小">
    <van-checkbox v-model="checkboxSize" icon-size="25px" class="demo-checkbox">
      复选框
    </van-checkbox>
  </demo-block>

  <demo-block title="自定义图标">
    <van-checkbox v-model="checkbox3" use-icon-slot class="demo-checkbox">
      自定义图标
      <template #icon>
        <img class="icon" :src="checkbox3 ? activeIcon : inactiveIcon" />
      </template>
    </van-checkbox>
  </demo-block>

  <demo-block title="禁用文本点击">
    <van-checkbox v-model="checkboxLabel" label-disabled class="demo-checkbox">
      复选框
    </van-checkbox>
  </demo-block>

  <demo-block title="复选框组">
    <van-checkbox-group v-model="result">
      <van-checkbox
        v-for="item in list"
        :key="item"
        :name="item"
        class="demo-checkbox"
      >
        复选框 {{ item }}
      </van-checkbox>
    </van-checkbox-group>
  </demo-block>

  <demo-block title="水平排列">
    <van-checkbox-group v-model="result4" direction="horizontal">
      <van-checkbox
        v-for="item in list"
        :key="item"
        :name="item"
        class="demo-checkbox"
      >
        复选框 {{ item }}
      </van-checkbox>
    </van-checkbox-group>
  </demo-block>

  <demo-block title="限制最大可选数">
    <van-checkbox-group v-model="result2" :max="2">
      <van-checkbox
        v-for="item in list"
        :key="item"
        :name="item"
        class="demo-checkbox"
      >
        复选框 {{ item }}
      </van-checkbox>
    </van-checkbox-group>
  </demo-block>

  <demo-block title="搭配单元格组件使用">
    <van-checkbox-group v-model="result3">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in list"
          :key="item"
          :title="`复选框 ${item}`"
          value-class="value-class"
          clickable
          @click="toggle(index)"
        >
          <template #default>
            <van-checkbox
              :ref="(el) => (checkboxRefs[index] = el)"
              :name="item"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </demo-block>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";

const checkbox1 = ref(true);
const checkbox2 = ref(true);
const checkbox3 = ref(true);
const checkboxLabel = ref(true);
const checkboxSize = ref(true);
const checkboxShape = ref(true);
const checkboxDisabled1 = ref(false);
const checkboxDisabled2 = ref(true);
const list = ref(["a", "b", "c"]);
const result = ref(["a", "b"]);
const result2 = ref([]);
const result3 = ref([]);
const result4 = ref([]);
const activeIcon = "https://img.yzcdn.cn/vant/user-active.png";
const inactiveIcon = "https://img.yzcdn.cn/vant/user-inactive.png";

const checkboxRefs = reactive<any[]>([]);

function toggle(index: number) {
  const checkbox = checkboxRefs[index];
  if (checkbox && typeof checkbox.toggle === "function") {
    checkbox.toggle();
  }
}
</script>
<style>
.demo-checkbox-group {
  margin: 10px 0 0 20px;
}

.demo-checkbox {
  margin: 10px 0 0 20px;
}

.value-class {
  flex: none !important;
}

.icon {
  width: 20px;
}
</style>
