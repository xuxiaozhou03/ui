
  <template>
   <van-overlay
  wx:if="{{ mask || forbidClick }}"
  show="{{ show }}"
  z-index="{{ zIndex }}"
  custom-style="{{ mask ? '' : 'background-color: transparent;' }}"
/>
<van-transition
  show="{{ show }}"
  custom-style="z-index: {{ zIndex }}"
  custom-class="van-toast__container"
>
  <view
    class="van-toast van-toast--{{ (type === 'text' || type === 'html') ? 'text' : 'icon' }} van-toast--{{ position }}"
    catch:touchmove="noop"
  >
    <!-- text only -->
    <text wx:if="{{ type === 'text' }}">{{ message }}</text>

    <!-- html only -->
    <rich-text wx:elif="{{ type === 'html' }}" nodes="{{ message }}"></rich-text>

    <!-- with icon -->
    <block wx:else>
      <van-loading
        wx:if="{{ type === 'loading' }}"
        color="white"
        type="{{ loadingType }}"
        custom-class="van-toast__loading"
      />
      <van-icon wx:else class="van-toast__icon" name="{{ type }}" />
      <text wx:if="{{ message }}" class="van-toast__text">{{ message }}</text>
    </block>

    <slot />
  </view>
</van-transition>

  </template>
  <script lang="ts" setup>
  import { VantComponent } from '../common/component';

VantComponent({
  props: {
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    zIndex: {
      type: Number,
      value: 1000,
    },
    type: {
      type: String,
      value: 'text',
    },
    loadingType: {
      type: String,
      value: 'circular',
    },
    position: {
      type: String,
      value: 'middle',
    },
  },

  methods: {
    // for prevent touchmove
    noop() {},
  },
});

  
  </script>
  
<style>
@import "./style.css";
</style>

  