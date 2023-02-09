import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
export default function SlidePanel() {
  return (
    <div className="relative h-[100vh] w-full">
      <div className="absolute bottom-0 h-[30%] w-full rounded-t-3xl bg-white"></div>
    </div>
  );
}
