"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  createdAt?: any;
};

const DRIVE_EMBED_BASE = "https://drive.google.com/uc?export=view&id=";

/**
 * Extracts Google Drive file ID from common link variants:
 * - https://drive.google.com/file/d/FILE_ID/view?...
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?export=download&id=FILE_ID
 * - https://drive.google.com/drive/folders/FILE_ID? (ignored; returns null)
 */
function extractDriveFileId(raw: string): string | null {
  if (!raw) return null;
  const url = raw.trim();

  // /file/d/FILE_ID/...
  const m1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m1?.[1]) return m1[1];

  // id=FILE_ID (open?id=..., uc?export=view&id=..., etc.)
  const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m2?.[1]) return m2[1];

  // Share shortcut sometimes copies just the ID (unlikely, but cheap check)
  if (/^[a-zA-Z0-9_-]{10,}$/.test(url) && !url.includes("://")) {
    return url;
  }

  return null;
}

function normalizeDriveUrl(input: string): string {
  const id = extractDriveFileId(input);
  if (id) return `${DRIVE_EMBED_BASE}${id}`;
  return input?.trim() ?? "";
}

export default function MenusCRUD() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [newMenu, setNewMenu] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    image: "",
    price: 0,
    createdAt: undefined,
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const qRef = query(
      collection(firestore, "menus"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(qRef);
    const data: MenuItem[] = snapshot.docs.map((d) => {
      const v = d.data() as any;
      return {
        id: d.id,
        name: v.name ?? "",
        description: v.description ?? "",
        image: v.image ?? "",
        price:
          typeof v.price === "number"
            ? v.price
            : Number.isFinite(Number(v.price))
            ? Number(v.price)
            : 0,
        createdAt: v.createdAt ?? null,
      };
    });
    setMenus(data);
  };

  const handleAdd = async () => {
    if (!newMenu.name.trim()) {
      return toast.error("Name is required");
    }
    if (!Number.isFinite(Number(newMenu.price))) {
      return toast.error("Price must be a number");
    }

    try {
      const normalizedImage = normalizeDriveUrl(newMenu.image);

      await addDoc(collection(firestore, "menus"), {
        name: newMenu.name.trim(),
        description: newMenu.description?.trim() ?? "",
        image: normalizedImage,
        price: Number(newMenu.price),
        createdAt: serverTimestamp(),
      });
      toast.success("Menu item added");
      setNewMenu({
        name: "",
        description: "",
        image: "",
        price: 0,
        createdAt: undefined,
      });
      fetchMenus();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to add item");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "menus", id));
      toast.success("Menu item deleted");
      fetchMenus();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to delete");
    }
  };

  const handleUpdate = async (m: MenuItem) => {
    if (!m.name.trim()) return toast.error("Name is required");
    if (!Number.isFinite(Number(m.price))) {
      return toast.error("Price must be a number");
    }
    try {
      const normalizedImage = normalizeDriveUrl(m.image);

      await updateDoc(doc(firestore, "menus", m.id), {
        name: m.name.trim(),
        description: m.description?.trim() ?? "",
        image: normalizedImage,
        price: Number(m.price),
      } as any);
      toast.success("Menu item updated");

      // Keep UI in sync with normalized image after save
      setMenus((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, image: normalizedImage } : x))
      );

      fetchMenus();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to update");
    }
  };

  const formatDate = (ts?: any) => {
    try {
      const date: Date =
        ts?.toDate?.() ??
        (typeof ts?.seconds === "number" ? new Date(ts.seconds * 1000) : null);
      return date ? date.toLocaleString() : "—";
    } catch {
      return "—";
    }
  };

  return (
    <section className="my-10">
      <h3 className="text-2xl font-bold text-customPink font-bree mb-4">
        Manage Menu
      </h3>

      <div className="grid gap-2 mb-6">
        <Input
          placeholder="Name"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newMenu.name}
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          className="bg-customLightPink text-customBlack font-semibold"
          value={newMenu.description}
          onChange={(e) =>
            setNewMenu({ ...newMenu, description: e.target.value })
          }
        />
        <Input
          placeholder="Image URL (Drive share link)"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newMenu.image}
          onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })}
          onBlur={(e) =>
            setNewMenu((prev) => ({
              ...prev,
              image: normalizeDriveUrl(e.target.value),
            }))
          }
        />
        <Input
          placeholder="Price"
          type="number"
          step="0.01"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={String(newMenu.price)}
          onChange={(e) =>
            setNewMenu({
              ...newMenu,
              price: Number(e.target.value),
            })
          }
        />
        <Button
          variant="secondary"
          onClick={handleAdd}
          className="bg-customPink"
        >
          Add Menu Item
        </Button>
      </div>

      {/* List + Edit */}
      <div className="grid gap-4">
        {menus.map((m) => (
          <Card key={m.id} className="bg-customLightPink shadow-md">
            <CardContent className="p-4 grid gap-3">
              <div className="flex items-start gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl ring-1 ring-black/10 bg-white">
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-sm text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                <div className="grid gap-2 flex-1">
                  <div className="text-xs text-gray-600">
                    Created: {formatDate(m.createdAt)}
                  </div>

                  <Input
                    className="bg-customPink text-customBlack font-semibold"
                    value={m.name}
                    onChange={(e) =>
                      setMenus((prev) =>
                        prev.map((x) =>
                          x.id === m.id ? { ...x, name: e.target.value } : x
                        )
                      )
                    }
                  />
                  <Textarea
                    className="bg-customPink text-customBlack font-semibold"
                    value={m.description}
                    onChange={(e) =>
                      setMenus((prev) =>
                        prev.map((x) =>
                          x.id === m.id
                            ? { ...x, description: e.target.value }
                            : x
                        )
                      )
                    }
                  />
                  <Input
                    className="bg-customPink text-customBlack font-semibold"
                    placeholder="Image URL (Drive share link)"
                    value={m.image}
                    onChange={(e) =>
                      setMenus((prev) =>
                        prev.map((x) =>
                          x.id === m.id ? { ...x, image: e.target.value } : x
                        )
                      )
                    }
                    onBlur={(e) =>
                      setMenus((prev) =>
                        prev.map((x) =>
                          x.id === m.id
                            ? { ...x, image: normalizeDriveUrl(e.target.value) }
                            : x
                        )
                      )
                    }
                  />
                  <div className="grid sm:grid-cols-2 gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      className="bg-customPink text-customBlack font-semibold"
                      value={String(m.price)}
                      onChange={(e) =>
                        setMenus((prev) =>
                          prev.map((x) =>
                            x.id === m.id
                              ? { ...x, price: Number(e.target.value) }
                              : x
                          )
                        )
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="secondary"
                      onClick={() => handleUpdate(m)}
                      className="bg-customPink"
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
