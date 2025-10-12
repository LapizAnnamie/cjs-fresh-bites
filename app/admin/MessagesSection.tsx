"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: { seconds: number };
}

interface Props {
  messages: ContactMessage[];
  onDelete: (id: string) => void;
}

export function MessagesSection({ messages, onDelete }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-customPink font-bree mb-4 mt-6">
        Contact Messages
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {messages.map((m) => (
          <Card key={m.id} className="bg-customLightPink shadow-md">
            <CardContent className="p-4 space-y-2">
              <p className="text-customBlack font-bree">{m.message}</p>
              <p className="text-sm text-customBlack">From: {m.name}</p>
              <p className="text-xs text-blue-500 break-all">
                Email: {m.email}
              </p>
              {m.createdAt && (
                <p className="text-xs text-red-500 italic font-bold">
                  {new Date(m.createdAt.seconds * 1000).toLocaleString()}
                </p>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(m.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
