import Link from 'next/link';

import { workSans } from 'fonts';
import { classes } from 'utils';
import { Button } from 'components/shared';
import { ArrowRightIcon } from 'components/icons';

interface DescriptionCardProps {
  description: string;
  url: string;
}

export const DescriptionCard = ({ description, url }: DescriptionCardProps) => {
  return (
    <div
      className={classes(
        'absolute right-0 top-1/2 z-10 flex h-[298px] w-[760px] flex-col justify-between bg-white bg-opacity-90 p-9',
        workSans.className,
      )}
    >
      <p className="mb-[42px] text-xl text-dark">{description}</p>

      <Link href={url}>
        <Button
          className={classes(
            'border-2 border-dark px-6 py-5 text-[18px] font-semibold text-dark hover:border-dark hover:bg-transparent hover:text-dark',
            workSans.className,
          )}
          icon={<ArrowRightIcon className="-rotate-45" />}
          iconPosition="right"
        >
          Find your working space
        </Button>
      </Link>
    </div>
  );
};
