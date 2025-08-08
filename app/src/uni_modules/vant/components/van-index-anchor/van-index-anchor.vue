
  <template>
   <view
  class="van-index-anchor-wrapper"
  style="{{ wrapperStyle }}"
>
  <view
    class="van-index-anchor {{ active ? 'van-index-anchor--active van-hairline--bottom' : '' }}"
    style="{{ anchorStyle }}"
  >
    <slot wx:if="{{ useSlot }}"/>
    <block wx:else>
      <text>{{ index }}</text>
    </block>
  </view>
</view>

  </template>
  <script lang="ts" setup>
  import { getRect } from '../common/utils';
import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';

VantComponent({
  relation: useParent('index-bar'),

  props: {
    useSlot: Boolean,
    index: null,
  },

  data: {
    active: false,
    wrapperStyle: '',
    anchorStyle: '',
  },

  methods: {
    scrollIntoView(scrollTop) {
      getRect(this, '.van-index-anchor-wrapper').then((rect) => {
        wx.pageScrollTo({
          duration: 0,
          scrollTop: scrollTop + rect.top - this.parent.data.stickyOffsetTop,
        });
      });
    },
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  