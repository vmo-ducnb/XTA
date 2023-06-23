import { BannerSection, FlexibleWorkingSpace } from './components';
import Condotel from './components/CondotelSection';
import ContactUs from './components/ContactUsSection';
import OurProject from './components/OurProjectSection';

export function MainPage() {
  return (
    <>
      <BannerSection />
      <FlexibleWorkingSpace />
      <OurProject />
      <Condotel />
      <ContactUs />
    </>
  );
}
