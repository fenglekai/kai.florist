let prefix = '--fs';
export function getPrefix() {
  return prefix;
}
export function setPrefix(value: string) {
  prefix = '--' + value
}

const theme = {
  'primary-color': "#6190e8",
  'second-color': "#acc1eb",
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
      const hyphenatedStr = getPrefix() + '-' + setHyphenatedStr(key);
      root.style.setProperty(hyphenatedStr, variable[key]);
    }
  }
}

export function getRootVariable(key: string) {
  const keys = Object.keys(theme);
  if (keys.includes(key)) {
    const joinStr = getPrefix() + '-' + setHyphenatedStr(key)
    return joinStr;
  } else {
    throw new Error(`Key ${key} is not present in the theme.`);
  }
}
