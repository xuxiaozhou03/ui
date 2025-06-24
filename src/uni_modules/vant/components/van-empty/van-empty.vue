
    <template>
    


<view class="custom-class van-empty">
  <view class="van-empty__image">
    <slot name="image"></slot>
  </view>
  <view class="van-empty__image">
    <image wx:if="{{ image }}" class="van-empty__image__img" src="{{ computed.imageUrl(image) }}" />
  </view>

  <view class="van-empty__description">
    <slot name="description"></slot>
  </view>
  <view class="van-empty__description">
    {{ description }}
  </view>

  <view class="van-empty__bottom">
    <slot></slot>
  </view>
</view>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    description: String,
    image: {
      type: String,
      value: 'default',
    },
  },
});


    // 把下面代码变成 computed 属性
    
var PRESETS = ['error', 'search', 'default', 'network'];

function imageUrl(image) {
  if (PRESETS.indexOf(image) !== -1) {
    return 'https://img.yzcdn.cn/vant/empty-image-' + image + '.png';
  }

  return image;
}

module.exports = {
  imageUrl: imageUrl,
};


    </script>
    <style>
    .van-empty{align-items:center;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:32px 0}.van-empty__image{height:160px;width:160px}.van-empty__image:empty{display:none}.van-empty__image__img{height:100%;width:100%}.van-empty__image:not(:empty)+.van-empty__image{display:none}.van-empty__description{color:#969799;font-size:14px;line-height:20px;margin-top:16px;padding:0 60px}.van-empty__description:empty,.van-empty__description:not(:empty)+.van-empty__description{display:none}.van-empty__bottom{margin-top:24px}
    </style>
  