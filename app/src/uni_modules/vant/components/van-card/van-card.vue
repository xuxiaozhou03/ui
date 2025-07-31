<template>
  <div class="van-card">
    <div
      :class="['van-card__header', { 'van-card__header--center': centered }]"
    >
      <div class="van-card__thumb" @click="onClickThumb">
        <img
          v-if="thumb"
          :src="thumb"
          :alt="title"
          :class="['van-card__img', thumbClass]"
          :loading="lazyLoad ? 'lazy' : undefined"
        />
        <template v-else>
          <slot name="thumb" />
        </template>
        <van-tag v-if="tag" mark type="danger" class="van-card__tag">
          {{ tag }}
        </van-tag>
        <template v-else>
          <slot name="tag" />
        </template>
      </div>

      <div
        :class="[
          'van-card__content',
          { 'van-card__content--center': centered },
        ]"
      >
        <div>
          <div v-if="title" class="van-card__title" :class="titleClass">
            {{ title }}
          </div>
          <template v-else>
            <slot name="title" />
          </template>

          <div v-if="desc" class="van-card__desc" :class="descClass">
            {{ desc }}
          </div>
          <template v-else>
            <slot name="desc" />
          </template>

          <slot name="tags" />
        </div>

        <div class="van-card__bottom">
          <slot name="price-top" />
          <div
            v-if="price !== undefined && price !== ''"
            class="van-card__price"
            :class="priceClass"
          >
            <span>{{ currency }}</span>
            <span class="van-card__price-integer">{{ integerStr }}</span>
            <span class="van-card__price-decimal">{{ decimalStr }}</span>
          </div>
          <template v-else>
            <slot name="price" />
          </template>
          <div
            v-if="originPrice !== undefined && originPrice !== ''"
            class="van-card__origin-price"
            :class="originPriceClass"
          >
            {{ currency }} {{ originPrice }}
          </div>
          <template v-else>
            <slot name="origin-price" />
          </template>
          <div v-if="num" class="van-card__num" :class="numClass">
            x {{ num }}
          </div>
          <template v-else>
            <slot name="num" />
          </template>
          <slot name="bottom" />
        </div>
      </div>
    </div>

    <div class="van-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { cardProps } from "./props";
import { jumpLink } from "../../utils";

const props = defineProps(cardProps);

const integerStr = computed(() => {
  if (props.price !== undefined && props.price !== null && props.price !== "") {
    const priceArr = props.price.toString().split(".");
    return priceArr[0];
  }
  return "";
});

const decimalStr = computed(() => {
  if (props.price !== undefined && props.price !== null && props.price !== "") {
    const priceArr = props.price.toString().split(".");
    return priceArr[1] ? `.${priceArr[1]}` : "";
  }
  return "";
});

function onClickThumb() {
  if (props.thumbLink) {
    jumpLink(props.thumbLink, props.linkType);
  }
}
</script>
<style>
.van-card {
  background-color: var(--card-background-color, #fafafa);
  box-sizing: border-box;
  color: var(--card-text-color, #323233);
  font-size: var(--card-font-size, 12px);
  padding: var(--card-padding, 8px 16px);
  position: relative;
}
.van-card__header {
  display: flex;
}
.van-card__header--center {
  align-items: center;
  justify-content: center;
}
.van-card__thumb {
  flex: none;
  height: var(--card-thumb-size, 88px);
  margin-right: var(--padding-xs, 8px);
  position: relative;
  width: var(--card-thumb-size, 88px);
}
.van-card__thumb:empty {
  display: none;
}
.van-card__img {
  border-radius: 8px;
  height: 100%;
  width: 100%;
}
.van-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  min-height: var(--card-thumb-size, 88px);
  min-width: 0;
  position: relative;
}
.van-card__content--center {
  justify-content: center;
}
.van-card__desc,
.van-card__title {
  word-wrap: break-word;
}
.van-card__title {
  font-weight: 700;
  line-height: var(--card-title-line-height, 16px);
}
.van-card__desc {
  color: var(--card-desc-color, #646566);
  line-height: var(--card-desc-line-height, 20px);
}
.van-card__bottom {
  line-height: 20px;
}
.van-card__price {
  color: var(--card-price-color, #ee0a24);
  display: inline-block;
  font-size: var(--card-price-font-size, 12px);
  font-weight: 700;
}
.van-card__price-integer {
  font-size: var(--card-price-integer-font-size, 16px);
}
.van-card__price-decimal,
.van-card__price-integer {
  font-family: var(
    --card-price-font-family,
    Avenir-Heavy,
    PingFang SC,
    Helvetica Neue,
    Arial,
    sans-serif
  );
}
.van-card__origin-price {
  color: var(--card-origin-price-color, #646566);
  display: inline-block;
  font-size: var(--card-origin-price-font-size, 10px);
  margin-left: 5px;
  text-decoration: line-through;
}
.van-card__num {
  float: right;
}
.van-card__tag {
  left: 0;
  position: absolute !important;
  top: 2px;
}
.van-card__footer {
  flex: none;
  text-align: right;
  width: 100%;
}
</style>
