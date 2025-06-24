import {
  inject,
  provide,
  reactive,
  isReactive,
  isRef,
  type InjectionKey,
} from "vue";

type WithMethods<T, M> = T & M;

export function useProvide<T extends object = any, M extends object = any>(
  key: InjectionKey<WithMethods<T, M>>,
  data: T,
  methods: M
) {
  const state = isReactive(data) || isRef(data) ? data : reactive(data);
  const provided = Object.assign({}, methods, state) as WithMethods<T, M>;
  provide(key, provided);
  return provided;
}

export function useInject<T = any>(key: InjectionKey<T>) {
  return inject(key, null);
}
