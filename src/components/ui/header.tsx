import React from "react"
import logo from "../../../public/logo.png"

export default function Header() {
   return (
      <nav className="shadow-md shadow-(--background) z-100 fixed top-0 left-0 right-0 bg-(--background)">
         <div className="flex items-center justify-between py-3 lg:px-20 px-10">
            <a href="https://santacasapg.com/" target="_blank">
               <img src={logo.src} alt="Logo" className="h-15" />
            </a>
            <div>
                  <a
                     href="https://mw49jvdl2df.typeform.com/to/snP0mTX1"
                     target="_blank"
                     className="flex text-center font-mono font-bold bg-(--error) text-(--background) lg:px-5 lg:py-3 px-3 py-2 lg:w-fit w-[200px] flex-wrap rounded-md hover:bg-(--dark-red) transition-colors cursor-pointer lg:text-base text-sm"
                  >
                     AJUDE PACIENTE COM CÂNCER
                  </a>
            </div>
         </div>
      </nav>
   )
}