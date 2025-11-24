import { json } from "@sveltejs/kit";
import { s as supabase } from "../../../../../chunks/supabase.js";
const GET = async ({ params }) => {
  try {
    const { data, error } = await supabase.from("members").select("*").eq("id", params.id).single();
    if (error) {
      return json({ error: error.message }, { status: 404 });
    }
    return json({ member: data });
  } catch (error) {
    return json({ error: "Failed to fetch member" }, { status: 500 });
  }
};
const PUT = async ({ params, request }) => {
  try {
    const body = await request.json();
    const updateData = {};
    if (body.name !== void 0) updateData.name = body.name;
    if (body.graduation_year !== void 0) updateData.graduation_year = body.graduation_year;
    if (body.phone !== void 0) updateData.phone = body.phone;
    if (body.birthday !== void 0) updateData.birthday = body.birthday;
    if (body.birthday_display !== void 0) updateData.birthday_display = body.birthday_display;
    const { data, error } = await supabase.from("members").update(updateData).eq("id", params.id).select().single();
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ member: data });
  } catch (error) {
    return json({ error: "Failed to update member" }, { status: 500 });
  }
};
const DELETE = async ({ params }) => {
  try {
    const { error } = await supabase.from("members").delete().eq("id", params.id);
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ success: true });
  } catch (error) {
    return json({ error: "Failed to delete member" }, { status: 500 });
  }
};
export {
  DELETE,
  GET,
  PUT
};
