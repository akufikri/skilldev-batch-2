"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

export function CounterItemButton() {
  const [qty, setQty] = useState(1);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant={"ghost"}
          onClick={() => setQty((prev) => Math.max(1, prev - 1))}
        >
          -
        </Button>
        <span className="font-semibold w-8 text-center">{qty}</span>
        <Button
          variant={"ghost"}
          onClick={() => setQty((prev) => Math.max(1, prev + 1))}
        >
          +
        </Button>
      </div>
    </>
  );
}
