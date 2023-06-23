import { SVGProps } from 'react';

export function CheckIcon({ fill = 'currentColor', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="done" clipPath="url(#clip0_654_28605)">
        <path
          id="Vector"
          d="M8.9999 16.2L4.7999 12L3.3999 13.4L8.9999 19L20.9999 7.00001L19.5999 5.60001L8.9999 16.2Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_654_28605">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
