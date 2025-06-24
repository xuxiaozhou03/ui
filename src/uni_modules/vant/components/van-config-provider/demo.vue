
    <template>
    <demo-block title="默认主题">
  <van-cell-group>
    <van-field label="评分">
      <view slot="input" style="width: 100%">
        <van-rate model:value="{{ rate }}" data-key="rate" bind:change="onChange" />
      </view>
    </van-field>
    <van-field label="滑块" border="{{ false }}">
      <view slot="input" style="width: 100%">
        <van-slider value="{{ slider }}" data-key="slider" bind:change="onChange" />
      </view>
    </van-field>
  </van-cell-group>

  <view style="margin: 16px">
    <van-button round block type="primary">提交</van-button>
  </view>
</demo-block>

<demo-block title="定制主题">
  <van-config-provider theme-vars="{{ themeVars }}">
    <van-cell-group>
      <van-field label="评分">
        <view slot="input" style="width: 100%">
          <van-rate model:value="{{ rate }}" data-key="rate" bind:change="onChange" />
        </view>
      </van-field>
      <van-field label="滑块" border="{{ false }}">
        <view slot="input" style="width: 100%">
          <van-slider value="{{ slider }}" data-key="slider" bind:change="onChange" />
        </view>
      </van-field>
    </van-cell-group>

    <view style="margin: 16px">
      <van-button round block type="primary">提交</van-button>
    </view>
  </van-config-provider>
</demo-block>

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps, addUnit } from "../../utils";
    import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    rate: 4,
    slider: 50,
    themeVars: {
      rateIconFullColor: '#07c160',
      sliderBarHeight: '4px',
      sliderButtonWidth: '20px',
      sliderButtonHeight: '20px',
      sliderActiveBackgroundColor: '#07c160',
      buttonPrimaryBorderColor: '#07c160',
      buttonPrimaryBackgroundColor: '#07c160',
    },
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({
        [key]: event.detail,
      });
    },
  },
});

    </script>
    <style>
    
    </style>
  