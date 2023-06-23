import Image from 'next/image';
import { Button } from 'components/shared';
import TitleSection from './TitleSection';

export default function OurProject() {
  return (
    <div className="my-10">
      <TitleSection name="Our Projects" />
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Image
            src="/ourproject1.png"
            alt=""
            width={570}
            height={255}
            className="h-[255px] w-full"
          />
          <Image
            src="/ourproject2.png"
            alt=""
            width={570}
            height={255}
            className="h-[255px] w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
          <Image
            src="/ourproject3.png"
            alt=""
            width={270}
            height={255}
            className="h-[255px] w-full"
          />
          <Image
            src="/ourproject4.png"
            alt=""
            width={470}
            height={255}
            className="h-[255px] w-full"
          />
          <Image
            src="/ourproject5.png"
            alt=""
            width={370}
            height={255}
            className="h-[255px] w-full"
          />
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <Button>ALL PROJECT</Button>
      </div>
    </div>
  );
}
