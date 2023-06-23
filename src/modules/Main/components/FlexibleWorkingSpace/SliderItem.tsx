import Image from 'next/image';

import { Container } from 'components/shared';
import { DescriptionCard } from './DescriptionCard';

interface SliderItemProps {
  leftImage: string;
  rightImage: string;
  description: string;
  url: string;
}

export const SliderItem = ({ leftImage, rightImage, description, url }: SliderItemProps) => {
  return (
    <div className="relative">
      <Container className="relative">
        <Image className="mr-5 h-fit" width={597} height={426} src={leftImage} alt="left" />

        <DescriptionCard description={description} url={url} />
      </Container>
      <Image
        className="absolute right-0 top-0 h-fit"
        width={710}
        height={665}
        src={rightImage}
        alt="right"
      />
    </div>
  );
};
