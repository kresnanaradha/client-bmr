type DataLayerEvent = Record<string, unknown> & { event: string };

function push(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: DataLayerEvent[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}

export function trackViewItem(item: { id: string; name: string; price?: number; category?: string }): void {
  push({
    event: "view_item",
    currency: "IDR",
    value: item.price ?? 0,
    items: [{ item_id: item.id, item_name: item.name, item_category: item.category, price: item.price ?? 0 }],
  });
}

export function trackBeginCheckout(item: { id: string; name: string; price?: number; category?: string }): void {
  push({
    event: "begin_checkout",
    currency: "IDR",
    value: item.price ?? 0,
    items: [{ item_id: item.id, item_name: item.name, item_category: item.category, price: item.price ?? 0 }],
  });
}

export function trackGenerateLead(payload: {
  reference: string;
  value: number;
  items: { id: string; name: string; pax: number; price: number }[];
}): void {
  push({
    event: "generate_lead",
    currency: "IDR",
    value: payload.value,
    transaction_id: payload.reference,
    items: payload.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      quantity: item.pax,
      price: item.price,
    })),
  });
}

/** Fired for every plain "chat with us" WhatsApp link that is not a full booking. */
export function trackContactWhatsApp(source: string): void {
  push({ event: "contact_whatsapp", source });
}
