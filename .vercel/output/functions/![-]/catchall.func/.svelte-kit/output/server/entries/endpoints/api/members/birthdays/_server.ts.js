import { json } from "@sveltejs/kit";
import { s as supabase } from "../../../../../chunks/supabase.js";
function daysUntilBirthday(birthday) {
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
  if (thisYearBirthday < today) {
    thisYearBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffTime = thisYearBirthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  return diffDays;
}
function getUpcomingBirthdays(members, days = 30) {
  const upcoming = [];
  for (const member of members) {
    if (!member.birthday) continue;
    const birthday = new Date(member.birthday);
    const daysUntil = daysUntilBirthday(birthday);
    if (daysUntil <= days) {
      upcoming.push({
        member,
        daysUntil,
        isToday: daysUntil === 0
      });
    }
  }
  upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
  return upcoming;
}
const GET = async ({ url }) => {
  const days = parseInt(url.searchParams.get("days") || "30");
  try {
    const { data, error } = await supabase.from("members").select("*").not("birthday", "is", null);
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    const upcomingBirthdays = getUpcomingBirthdays(data, days);
    return json({ birthdays: upcomingBirthdays });
  } catch (error) {
    return json({ error: "Failed to fetch birthdays" }, { status: 500 });
  }
};
export {
  GET
};
