"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { SidebarItem } from "@/types/events";

type MobileSidebarProps = {
  items: SidebarItem[];
  settingsItem: SidebarItem;
};

export default function MobileSidebar({ items, settingsItem }: MobileSidebarProps) {


  const [open, setOpen] = useState(false);



  return (

    <>


      <button

        onClick={() => setOpen(true)}

        className="
          fixed
          left-3
          top-3
          z-50
          rounded-2xl
          border
          border-white/10
          bg-black/40
          px-4
          py-3
          text-white
          shadow-lg
          backdrop-blur-xl
          lg:hidden
        "

      >

        <Menu className="h-5 w-5" />

      </button>






      {open && (


        <div

          className="
            fixed
            inset-0
            z-50
            bg-black/60
            lg:hidden
          "

          onClick={() => setOpen(false)}

        >



          <aside

            onClick={(event) => event.stopPropagation()}

            className="
              h-full
              w-80
              border-r
              border-white/10
              bg-zinc-950/95
              p-6
            "

          >



            <button

              onClick={()=>setOpen(false)}

              className="
                mb-6
                text-white
              "

            >

              <X className="h-6 w-6" />


            </button>





            <nav className="space-y-3">


              {items.map((item) => (


                <Link

                  key={item.name}

                  href={item.href}

                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
                    text-white
                    transition
                    hover:bg-white/10
                  "

                  onClick={()=>setOpen(false)}

                >

                  <span>
                    {item.icon}
                  </span>


                  {item.name}


                </Link>


              ))}



            </nav>







            <div className="mt-auto pt-10">


              <Link

                href={settingsItem.href}

                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-3
                  text-white
                  transition
                  hover:bg-white/10
                "

              >

                <span>
                  {settingsItem.icon}
                </span>


                {settingsItem.name}


              </Link>


            </div>





          </aside>



        </div>


      )}



    </>


  );

}