
    <template>
    <demo-block title="基础用法">
  <van-area
    value="{{ value }}"
    loading="{{ loading }}"
    area-list="{{ areaList }}"
    bind:change="onChange"
    bind:confirm="onConfirm"
    bind:cancel="onCancel"
  />
</demo-block>
<van-toast id="van-toast" />

    </template>
    <script lang="ts" setup>
    import { cn, bem, commonProps } from "../../utils";
    import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

const db = wx.cloud?.database();

VantComponent({
  data: {
    areaList: {},
    loading: true,
    value: 330302,
  },

  mounted() {
    db?.collection('region')
      .limit(1)
      .get()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          this.setData({
            loading: false,
            areaList: res.data[0],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setData({
          loading: false,
        });
      });
  },

  methods: {
    onChange(event) {
      const { values } = event.detail;

      Toast({
        context: this,
        message: values.map((item) => item.name).join('-'),
      });
    },

    onConfirm(event) {
      console.log(event);
    },

    onCancel(event) {
      console.log(event);
    },
  },
});

    </script>
    <style>
    
    </style>
  