"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Testimonial {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  rating: number;
}

interface Props {
  testimonials: Testimonial[];
  showOnlyUnapproved: boolean;
  setShowOnlyUnapproved: (val: boolean) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  itemsPerPage: number;
  onToggleApprove: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  logoutButton?: React.ReactNode;
}

export function TestimonialSection({
  testimonials,
  showOnlyUnapproved,
  setShowOnlyUnapproved,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  onToggleApprove,
  onDelete,
}: Props) {
  const filtered = testimonials
    .filter((t) => (showOnlyUnapproved ? !t.approved : true))
    .filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-customPink font-bree">
          Testimonials
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white text-customBlack"
          />
          <Button
            size="sm"
            variant="default"
            className={`${
              showOnlyUnapproved
                ? "bg-customPink text-white hover:bg-customPink/90"
                : "bg-customLightPink border border-customPink text-customBlack hover:bg-customPink hover:text-customWhite"
            } transition`}
            onClick={() => setShowOnlyUnapproved(!showOnlyUnapproved)}
          >
            {showOnlyUnapproved ? "Show All" : "Show Only Unapproved"}
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-primary-foreground italic mt-10">
          No testimonials matched your search.
        </p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {paginated.map((t) => (
              <Card key={t.id} className="bg-customLightPink shadow-md">
                <CardContent className="p-4 space-y-2">
                  <p className="text-customBlack font-bree italic">
                    “{t.message}”
                  </p>
                  <p className="text-sm text-right text-customBlack">
                    — {t.name} — {t.rating} stars
                  </p>
                  <div className="flex gap-2 justify-end mt-2">
                    <Button
                      size="sm"
                      variant={t.approved ? "secondary" : "default"}
                      onClick={() => onToggleApprove(t.id, t.approved)}
                    >
                      {t.approved ? "Disapprove" : "Approve"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(t.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(totalPages)].map((_, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={currentPage === idx + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
