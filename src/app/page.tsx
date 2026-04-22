import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Stats from '@/components/Stats/Stats';
import PracticeAreas from '@/components/PracticeAreas/PracticeAreas';
import OrganicConnectivity from '@/components/OrganicConnectivity/OrganicConnectivity';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import LawyerProfiles from '@/components/LawyerProfiles/LawyerProfiles';
import CTA from '@/components/CTA/CTA';
import PhilosophyMessage from '@/components/PhilosophyMessage/PhilosophyMessage';
import PartnersDetail from '@/components/PartnersDetail/PartnersDetail';
import PartnerCarousel from '@/components/PartnerCarousel/PartnerCarousel';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <Stats />
        <PracticeAreas />
        <OrganicConnectivity />
        <CustomerReviews />
        <SuccessStories />
        <LawyerProfiles />
        <CTA />
        <PhilosophyMessage />
        <PartnersDetail />
        <PartnerCarousel />
      </main>

      <Footer />
    </div>
  );
}
