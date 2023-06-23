import { Button } from 'components/shared';
import Image from 'next/image';
import TitleSection from './TitleSection';

export default function Condotel() {
  return (
    <div className="mx-10 my-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className=" mt-8 flex flex-col gap-6">
        <Image src="/main/condotel1.png" alt="" width={270} height={265} className="w-full" />
        <Image src="/main/condotel2.png" alt="" width={270} height={140} className="w-full" />
      </div>
      <div className="lg:mt-16">
        <Image src="/main/condotel3.png" alt="" width={270} height={140} className="w-full" />
      </div>
      <div className="mt-5">
        <TitleSection name="Condotel" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas error ea enim beatae
          veritatis nulla hic unde aperiam, quaerat sequi soluta labore illum explicabo assumenda
          ullam harum minus facilis corrupti.
        </p>
        <Button>READ MORE</Button>
      </div>
    </div>
  );
}
