let prefix = '--fs';
export function getPrefix() {
  return prefix;
}
export function setPrefix(value: string) {
  prefix = '--' + value
}

const theme = {
  'primary-color': "#6190e8",
  'second-color': "#7393d0",
  'text-color': "#303133",
  'text-second-color': "#909399",
  'text-dark-color': "#ffffff",
  'bg-color': "#f5f5f5",
};
export function getTheme() {
  return theme;
}
/**
 *
 * @param key example primaryColor / secondColor
 * @param value string
 */
export function setTheme(key: string, value: any) {
  theme[key] = value;
}

function setHyphenatedStr(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function setRootVariable() {
  const variable = getTheme();
  const root = document.documentElement;
  for (const key in variable) {
    if (Object.prototype.hasOwnProperty.call(variable, key)) {
      const hyphenatedStr = prefix + '-' + setHyphenatedStr(key);
      root.style.setProperty(hyphenatedStr, variable[key]);
    }
  }
}
