
    <template>
    <view class="van-sidebar custom-class">
  <slot />
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';

VantComponent({
  relation: useChildren('sidebar-item', function () {
    this.setActive(this.data.activeKey);
  }),

  props: {
    activeKey: {
      type: Number,
      value: 0,
      observer: 'setActive',
    },
  },

  beforeCreate() {
    this.currentActive = -1;
  },

  methods: {
    setActive(activeKey: number) {
      const { children, currentActive } = this;

      if (!children.length) {
        return Promise.resolve();
      }

      this.currentActive = activeKey;

      const stack: Promise<unknown>[] = [];

      if (currentActive !== activeKey && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }

      if (children[activeKey]) {
        stack.push(children[activeKey].setActive(true));
      }

      return Promise.all(stack);
    },
  },
});


    
    </script>
    <style>
    .van-sidebar{width:var(--sidebar-width,80px)}
    </style>
  