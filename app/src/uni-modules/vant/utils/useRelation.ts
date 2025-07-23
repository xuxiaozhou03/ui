import { provide, inject, InjectionKey } from "vue";

/**
 * useParentProvide - Provide parent data and methods with type safety and custom key
 * @param data - The data/methods to provide
 * @param key - Optional custom injection key (symbol)
 */
export function useParentProvide<T extends object>(
  data: T,
  key: InjectionKey<T>
) {
  provide(key, data);
  return data;
}

/**
 * useChildInject - Inject parent data/methods with type safety and custom key
 * @param key - Optional custom injection key (symbol)
 */
export function useChildInject<T extends object>(key: InjectionKey<T>) {
  const parent = inject<T | null>(key, null);
  return { parent };
}

// ================= 示例用法 =================
// 1. 定义注入 key（推荐统一管理）
// import { reactive } from "vue";
// export const parentRelationKey: InjectionKey<
//   ReturnType<typeof createParentData>
// > = Symbol("parentRelation");

// // 2. 父组件中
// function createParentData() {
//   const state = reactive({
//     count: 0,
//     increment() {
//       state.count++;
//     },
//   });
//   return state;
// }

// // 在父组件 setup 内：
// // const parentData = createParentData();
// // useParentProvide(parentData, parentRelationKey);

// // 3. 子组件中
// // const { parent } = useChildInject(parentRelationKey);
// // parent?.count // 响应式
// // parent?.increment() // 方法
