import { SVGProps } from 'react';

export function ArrowTopRightIcon({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="mdi:arrow-bottom-left">
        <path id="Vector" d="M5 17.59L6.41 19L17 8.41V15H19V5H9V7H15.59L5 17.59Z" fill={fill} />
      </g>
    </svg>
  );
}
