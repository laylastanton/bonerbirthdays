import "clsx";
import { x as attributes, y as clsx, w as attr, z as bind_props, F as ensure_array_like } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/context.js";
function Button($$renderer, $$props) {
  let {
    variant = "primary",
    size = "md",
    class: className = "",
    children,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  $$renderer.push(`<button${attributes({ class: clsx(classes), ...rest })}>`);
  children($$renderer);
  $$renderer.push(`<!----></button>`);
}
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      label,
      error,
      helperText,
      value = "",
      class: className = "",
      $$slots,
      $$events,
      ...rest
    } = $$props;
    const inputClasses = `block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"} ${className}`;
    $$renderer2.push(`<div class="w-full">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", rest.id)} class="block text-sm font-medium text-gray-700 mb-1">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <input${attributes({ value, class: clsx(inputClasses), ...rest }, void 0, void 0, void 0, 4)}/> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="mt-1 text-sm text-red-600">${escape_html(error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (helperText) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="mt-1 text-sm text-gray-500">${escape_html(helperText)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value });
  });
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = void 0, onClose, title, children, footer } = $$props;
    if (open) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4" role="dialog" aria-modal="true" tabindex="-1"><div class="relative w-full max-w-lg bg-white rounded-lg shadow-xl">`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between p-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">${escape_html(title)}</h3> <button aria-label="Close modal" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="p-4">`);
      children($$renderer2);
      $$renderer2.push(`<!----></div> `);
      if (footer) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-end gap-2 p-4 border-t border-gray-200">`);
        footer($$renderer2);
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { open });
  });
}
const GRADUATION_YEARS = ["25s", "26s", "27s", "28s", "29s", "gra"];
function MemberForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { member, onSubmit, onCancel } = $$props;
    let name = member?.name || "";
    let graduationYear = member?.graduation_year || "25s";
    let phone = member?.phone || "";
    let birthdayInput = member?.birthday_display || "";
    let isSubmitting = false;
    let errors = {};
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<form class="space-y-4">`);
      Input($$renderer3, {
        id: "member-name",
        label: "Name *",
        placeholder: "Enter name",
        error: errors.name,
        required: true,
        get value() {
          return name;
        },
        set value($$value) {
          name = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div><label for="grad-year" class="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label> `);
      $$renderer3.select(
        {
          id: "grad-year",
          value: graduationYear,
          class: "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array = ensure_array_like(GRADUATION_YEARS);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let year = each_array[$$index];
            $$renderer4.option({ value: year }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(year === "gra" ? "Graduate" : `'${year}`)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        }
      );
      $$renderer3.push(`</div> `);
      Input($$renderer3, {
        id: "member-phone",
        label: "Phone Number",
        placeholder: "(555) 555-5555",
        error: errors.phone,
        helperText: "Optional",
        type: "tel",
        get value() {
          return phone;
        },
        set value($$value) {
          phone = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "member-birthday",
        label: "Birthday",
        placeholder: "Jan 12 or January 12",
        helperText: "Optional - Enter as 'Jan 12' or 'January 12'",
        get value() {
          return birthdayInput;
        },
        set value($$value) {
          birthdayInput = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="flex items-center justify-end gap-3 pt-4">`);
      Button($$renderer3, {
        type: "button",
        variant: "ghost",
        onclick: onCancel,
        disabled: isSubmitting,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancel`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        disabled: isSubmitting,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html(member ? "Update" : "Create")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></form>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let members = [];
    let birthdays = [];
    let showAddModal = false;
    let showEditModal = false;
    let editingMember = null;
    async function loadMembers() {
      try {
        const response = await fetch("/api/members");
        const data = await response.json();
        if (data.members) {
          members = data.members;
        }
      } catch (error) {
        console.error("Failed to load members:", error);
      }
    }
    async function loadBirthdays() {
      try {
        const response = await fetch("/api/members/birthdays?days=30");
        const data = await response.json();
        if (data.birthdays) {
          birthdays = data.birthdays;
        }
      } catch (error) {
        console.error("Failed to load birthdays:", error);
      }
    }
    async function handleCreateMember(data) {
      try {
        const response = await fetch("/api/members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          await Promise.all([loadMembers(), loadBirthdays()]);
          showAddModal = false;
        }
      } catch (error) {
        console.error("Failed to create member:", error);
      }
    }
    async function handleUpdateMember(data) {
      if (!editingMember) return;
      try {
        const response = await fetch(`/api/members/${editingMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          await Promise.all([loadMembers(), loadBirthdays()]);
          showEditModal = false;
          editingMember = null;
        }
      } catch (error) {
        console.error("Failed to update member:", error);
      }
    }
    async function handleDeleteMember() {
      if (!editingMember) return;
      if (!confirm(`Are you sure you want to delete ${editingMember.name}?`)) {
        return;
      }
      try {
        const response = await fetch(`/api/members/${editingMember.id}`, { method: "DELETE" });
        if (response.ok) {
          await Promise.all([loadMembers(), loadBirthdays()]);
          showEditModal = false;
          editingMember = null;
        }
      } catch (error) {
        console.error("Failed to delete member:", error);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="min-h-screen bg-gray-50"><header class="bg-white border-b border-gray-200 sticky top-0 z-10"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary-600">B1 Dashboard</h1> <p class="text-sm text-gray-600 mt-1">Boners Living Community</p></div> `);
      Button($$renderer3, {
        onclick: () => showAddModal = true,
        children: ($$renderer4) => {
          $$renderer4.push(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Add Member`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div></header> <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex items-center justify-center py-12"><div class="text-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div> <p class="mt-4 text-gray-600">Loading members...</p></div></div>`);
      }
      $$renderer3.push(`<!--]--></main></div> `);
      Modal($$renderer3, {
        open: showAddModal,
        onClose: () => showAddModal = false,
        title: "Add New Member",
        children: ($$renderer4) => {
          MemberForm($$renderer4, {
            onSubmit: (data) => handleCreateMember(data),
            onCancel: () => showAddModal = false
          });
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Modal($$renderer3, {
        open: showEditModal,
        onClose: () => {
          showEditModal = false;
          editingMember = null;
        },
        title: "Edit Member",
        children: ($$renderer4) => {
          if (editingMember) {
            $$renderer4.push("<!--[-->");
            MemberForm($$renderer4, {
              member: editingMember,
              onSubmit: handleUpdateMember,
              onCancel: () => {
                showEditModal = false;
                editingMember = null;
              }
            });
            $$renderer4.push(`<!----> <div class="mt-4 pt-4 border-t border-gray-200">`);
            Button($$renderer4, {
              variant: "danger",
              onclick: handleDeleteMember,
              size: "sm",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Delete Member`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
