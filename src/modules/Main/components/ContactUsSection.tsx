import { Button } from 'components/shared';
import Image from 'next/image';
import TitleSection from './TitleSection';

export default function ContactUs() {
  return (
    <div className="">
      <TitleSection name="Contact Us" />
      <div className="grid grid-cols-1 pb-5 md:gap-6 lg:grid-cols-3">
        <div className="flex flex-col ">
          <input placeholder="Name" className="mb-3 w-full bg-gray-500 py-3 pl-3" />
          <input placeholder="Phone number" className="mb-3 bg-gray-500 py-3 pl-3" />
          <input placeholder="E-mail" className="mb-3 bg-gray-500 py-3 pl-3" />
          <input placeholder="Interested In" className="mb-3 bg-gray-500 py-3 pl-3" />
          <textarea name="Message" rows={6} className="mb-3 bg-gray-500 sm:mb-0" />
        </div>
        <div className="col-span-2 hidden h-5 lg:block">
          <Image src="/main/contact.png" alt="" width={769} height={369} className="w-full" />
        </div>
      </div>
      <Button className="mt-10">SEND EMAIL</Button>
    </div>
  );
}
