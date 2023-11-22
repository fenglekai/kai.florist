export function debounce(fn: any, wait: number | undefined) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}