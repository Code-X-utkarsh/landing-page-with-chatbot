"use client";

import dynamic from "next/dynamic";

export const ClientChatWidget = dynamic(
    () => import("./ChatWidget").then((mod) => mod.ChatWidget),
    { ssr: false }
);
