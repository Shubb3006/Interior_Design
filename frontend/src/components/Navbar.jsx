import React, { useEffect, useState } from "react";
import LeadForm from "./LeadForm";
import { Sun, X } from "lucide-react";
import ThemeController from "./ThemeController";

const Navbar = () => {
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModal]);
  return (
    <>
      <div className="flex justify-between sm:px-10 px-2 py-3 bg-base-200 rounded-md items-center">
        <div className="text-xl font-bold">Logo</div>
        <div className="flex gap-4 items-center">
          <ThemeController />
          <button
            className="btn btn-primary rounded-md"
            onClick={() => setIsModal(true)}
          >
            Get Free Quote
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModal && (
        <dialog className="modal modal-open">
          {/* Backdrop */}
          <div
            className="modal-backdrop backdrop-blur-sm bg-black/40"
            onClick={() => setIsModal(false)}
          />

          {/* Modal Box */}
          <div className="modal-box max-w-xl bg-base-200 relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModal(false)}
            >
              <X />
            </button>

            <LeadForm />
          </div>
        </dialog>
      )}
    </>
  );
};

export default Navbar;
