import { json } from "@sveltejs/kit";
import { s as supabase } from "../../../../chunks/supabase.js";
const GET = async ({ url }) => {
  const gradYear = url.searchParams.get("gradYear");
  try {
    let query = supabase.from("members").select("*").order("graduation_year", { ascending: false });
    if (gradYear) {
      query = query.eq("graduation_year", gradYear);
    }
    const { data, error } = await query;
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ members: data });
  } catch (error) {
    return json({ error: "Failed to fetch members" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from("members").insert([
      {
        name: body.name,
        graduation_year: body.graduation_year,
        phone: body.phone || null,
        birthday: body.birthday || null,
        birthday_display: body.birthday_display || null
      }
    ]).select().single();
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ member: data }, { status: 201 });
  } catch (error) {
    return json({ error: "Failed to create member" }, { status: 500 });
  }
};
export {
  GET,
  POST
};
