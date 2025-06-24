
    <template>
    

<view
  class="custom-class {{ utils.bem('tab__pane', { active, inactive: !active }) }}"
  style="{{ shouldShow ? '' : 'display: none;' }}"
>
  <slot wx:if="{{ shouldRender }}" />
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { useParent } from '../common/relation';
import { VantComponent } from '../common/component';

VantComponent({
  relation: useParent('tabs'),

  props: {
    dot: {
      type: Boolean,
      observer: 'update',
    },
    info: {
      type: null,
      observer: 'update',
    },
    title: {
      type: String,
      observer: 'update',
    },
    disabled: {
      type: Boolean,
      observer: 'update',
    },
    titleStyle: {
      type: String,
      observer: 'update',
    },
    name: {
      type: null,
      value: '',
    },
  },

  data: {
    active: false,
  },

  methods: {
    getComputedName() {
      if (this.data.name !== '') {
        return this.data.name;
      }
      return this.index;
    },

    updateRender(active, parent) {
      const { data: parentData } = parent;

      this.inited = this.inited || active;
      this.setData({
        active,
        shouldRender: this.inited || !parentData.lazyRender,
        shouldShow: active || parentData.animated,
      });
    },

    update() {
      if (this.parent) {
        this.parent.updateTabs();
      }
    },
  },
});


    
    </script>
    <style>
    :host{box-sizing:border-box;flex-shrink:0;width:100%}.van-tab__pane{-webkit-overflow-scrolling:touch;box-sizing:border-box;overflow-y:auto}.van-tab__pane--active{height:auto}.van-tab__pane--inactive{height:0;overflow:visible}
    </style>
  