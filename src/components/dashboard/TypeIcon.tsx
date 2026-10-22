import { createElement } from "react";

import { getTypeIcon } from "@/lib/item-types";

interface TypeIconProps {
  icon: string;
  color?: string;
  className?: string;
}

export default function TypeIcon({ icon, color, className }: TypeIconProps) {
  return createElement(getTypeIcon(icon), { className, style: { color } });
}
