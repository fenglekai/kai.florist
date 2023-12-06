import type { UserConfigExport } from "@tarojs/cli";

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {},
  env: {
    TARO_APP_API: '"http://127.0.0.1:7001"',
  },
} satisfies UserConfigExport;
