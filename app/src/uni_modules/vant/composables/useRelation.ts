import { provide, inject, type InjectionKey } from "vue";

export function useProvideParent<T extends object>(
  key: InjectionKey<T>,
  data: T
) {
  provide(key, data);
}

export function useInjectParent<T extends object>(
  key: InjectionKey<T>
): T | null {
  return inject(key, null);
}
