import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns/esm";
import { zhCN } from "date-fns/locale";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
    locale: zhCN, // 使用中文本地化配置
  }).replace("大约", "");
// .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const dateToISO = function (date) {
  date.setHours(8, 0, 0, 0); // 中国时区设置为8点，这样转换为UTC世界时就是0点。如果不这样做，中国11月2日0点转UTC就是11月1日16点，再转ISO就会早一天。
  return date.toISOString().slice(0, -1);
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" }).format(
    value
  );
