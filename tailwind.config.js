/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "gray-1": "hsl(var(--gray-1))",
        "gray-2": "hsl(var(--gray-2))",
        "gray-3": "hsl(var(--gray-3))",
        "gray-4": "hsl(var(--gray-4))",
        "gray-5": "hsl(var(--gray-5))",
        "gray-6": "hsl(var(--gray-6))",
        "gray-7": "hsl(var(--gray-7))",
        "gray-8": "hsl(var(--gray-8))",
        danger: "hsl(var(--danger))",
        primary: "hsl(var(--primary))",
        warn: "hsl(var(--warn))",
        success: "hsl(var(--success))",
      },
    },
  },
  plugins: [],
  content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  // 其他配置项
  // ...
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false,
  },
};
