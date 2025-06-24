
    <template>
    <demo-block title="基础用法">
  <van-picker
    columns="{{ column1 }}"
    bind:change="onChange1"
  />
</demo-block>

<demo-block title="默认选中项">
  <van-picker
    columns="{{ column1 }}"
    default-index="{{ 2 }}"
    bind:change="onChange1"
  />
</demo-block>

<demo-block title="展示顶部栏">
  <van-picker
    show-toolbar
    title="标题"
    columns="{{ column1 }}"
    bind:change="onChange1"
    bind:confirm="onConfirm"
    bind:cancel="onCancel"
  />
</demo-block>

<demo-block title="多列联动">
  <van-picker
    columns="{{ column4 }}"
    bind:change="onChange2"
  />
</demo-block>

<demo-block title="禁用选项">
  <van-picker columns="{{ column2 }}" />
</demo-block>

<demo-block title="加载状态">
  <van-picker
    loading
    columns="{{ column4 }}"
  />
</demo-block>

<van-toast id="van-toast" />

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps, addUnit } from "../../utils";
    import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    column1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    column2: [
      { text: '杭州', disabled: true },
      { text: '宁波' },
      { text: '温州' },
    ],
    column3: {
      浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      福建: ['福州', '厦门', '莆田', '三明', '泉州'],
    },
    column4: [
      {
        values: ['浙江', '福建'],
        className: 'column1',
      },
      {
        values: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
  },

  methods: {
    onChange1(event) {
      const { value, index } = event.detail;
      Toast({
        context: this,
        message: `Value: ${value}, Index：${index}`,
      });
    },

    onConfirm(event) {
      const { value, index } = event.detail;
      Toast({
        context: this,
        message: `Value: ${value}, Index：${index}`,
      });
    },

    onCancel() {
      Toast({
        context: this,
        message: '取消',
      });
    },

    onChange2(event) {
      const { picker, value } = event.detail;
      picker.setColumnValues(1, this.data.column3[value[0]]);
      getApp().picker = picker;
    },
  },
});

    </script>
    <style>
    
    </style>
  