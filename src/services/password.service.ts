import { Password } from "@types";

const passwordService = {
  create: async (data: Omit<Password, "id">) => {
    const res = await fetch("/create/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  },

  read: async (site?:string): Promise<{ok: boolean, data: Password[]}> => {
    const res = await fetch(`/read/${site ? "password" : "passwords"}`, {
      'method': site ? 'POST' : 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      body: site ? JSON.stringify({site: site}) : null
    });

    if (!res.ok) {
      throw new Error();
    }
    const response = await res.json();
    // const data = await Promise.all(
    //   response.data.map(async (item: Password) => {
    //     try {
    //       if (site) return {...item}
    //       const rootDomain = getRootDomain(item.site);
    //       const response = await fetch(`https://favicone.com/${rootDomain}?s=32&json`);
    //       const favicon = await response.json();
    //       return { ...item, icon: response.ok ? favicon.icon : "" };
    //     } catch {
    //       return { ...item, icon: "" };
    //     }
    //   })
    // )
    return {'ok' : true, data: response.data}
  },


  update: async (data: Omit<Password, "site" | "icon">) => {
    const res = await fetch("/update/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch("/delete/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: id}),
    });

    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  },

};

export default passwordService;