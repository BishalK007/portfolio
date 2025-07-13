import * as React from "react"
import { SVGProps } from "react"

interface ReloadIconProps extends SVGProps<SVGSVGElement> {
  pathColor?: string;
}

const ReloadIcon = ({ pathColor = "black", ...props }: ReloadIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={pathColor}
      d="M23 12A11 11 0 1 1 12 1a10.9 10.9 0 0 1 5.882 1.7l1.411-1.411A1 1 0 0 1 21 2v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-.707-1.707l1.127-1.127A8.9 8.9 0 0 0 12 3a9 9 0 1 0 9 9 1 1 0 0 1 2 0Z"
    />
  </svg>
)
export default ReloadIcon
