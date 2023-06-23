import { SVGProps } from 'react';

export default function FacebookIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM13.2507 12.5271V19.0557H10.5495V12.5274H9.19995V10.2776H10.5495V8.92678C10.5495 7.0914 11.3115 6 13.4765 6H15.279V8.25006H14.1523C13.3095 8.25006 13.2538 8.56447 13.2538 9.15125L13.2507 10.2773H15.2917L15.0529 12.5271H13.2507Z"
          fill="#0066FF"
        />
      </svg>
    </div>
  );
}