"use client";

import Image from "next/image";

const TRUCK_SRC = "/truck.png";

export default function MatterOfTaste() {
  return (
    <section className="w-full bg-customVeryLightPink relative overflow-visible">
      <div
        className="
          mx-auto max-w-7xl px-6
          pt-4 pb-12 sm:pt-8 sm:pb-16
          flex flex-col items-center gap-10
          lg:grid lg:grid-cols-[1.1fr,1fr] lg:items-start
        "
      >
        {/* LEFT Column */}
        <div className="relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left w-full">
          <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
            A Matter of <span className="text-customRed">Taste</span>
          </h3>

          <p className="mt-4 text-black text-lg sm:text-xl leading-snug max-w-2xl">
            We believe that great food and drinks speak for themselves.
          </p>

          {/* Food Truck Image */}
          <div className="relative w-full flex justify-center lg:justify-start mt-6">
            <div
              className="
                relative z-30
                w-[90%] sm:w-[85%] md:w-[80%]
                -mb-10 sm:-mb-12
                lg:w-[130%] lg:mt-[-10%] lg:-mb-24 lg:ml-[-15%]
              "
            >
              <Image
                src={TRUCK_SRC}
                alt="CJ's Fresh Bites food truck"
                width={1800}
                height={1200}
                priority
                sizes="(min-width:1024px) 780px, 90vw"
                className="h-auto w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="
            bg-customRed text-white rounded-3xl
            p-6 sm:p-8 shadow-md ring-1 ring-black/5
            relative z-10
            mt-6 lg:mt-0 lg:-ml-16
            lg:text-left
            pb-10 sm:pb-12 lg:pb-8
            w-full lg:w-auto
          "
        >
          <ul className="space-y-8">
            <li className="flex items-start gap-4">
              <Badge>1</Badge>
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg sm:text-xl text-[#F6C244]">
                  Fresh, Seasonal Ingredients
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  We celebrate the seasons by using the best local and homegrown
                  produce to create vibrant and flavorful Filipino dishes. Our
                  goal is to bring you an authentic taste of the Philippines
                  using only the highest quality ingredients.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Badge>2</Badge>
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg sm:text-xl text-[#F6C244]">
                  Comfort Food, Elevated
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  We take classic Filipino comfort food and elevate it to the
                  next level, with authentic flavors and dishes like our famous
                  lumpia and pancit prepared with care. Our food is guaranteed
                  to stand out and keep you coming back for more.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Badge>3</Badge>
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg sm:text-xl text-[#F6C244]">
                  Better Beverages
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  We offer a refreshing selection of drinks perfect for any time
                  of day, including our special lemonade tea. For dessert,
                  indulge in our seasonal specialties: a creamy fruit salad with
                  fresh papaya and a special creamy mango float.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-black text-white font-extrabold text-sm shrink-0">
      {children}
    </span>
  );
}
