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
import LocationMap from '@/components/Location/LocationMap/LocationMap';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <Hero />
        <Stats />
        <PracticeAreas />
        <OrganicConnectivity />
        <CustomerReviews />
        <SuccessStories />
        <LawyerProfiles />
        <CTA />
        {/* <PhilosophyMessage /> */}
        {/* <PartnersDetail /> */}
        {/* <PartnerCarousel /> */}
        
        {/* Location Section */}
        <div style={{ background: '#f9fafb', padding: '120px 0 0' }}>
          <div className="container">
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: 800, 
              textAlign: 'center', 
              marginBottom: '80px',
              color: '#0A1B39',
              letterSpacing: '-1.5px'
            }}>오시는 길</h2>
          </div>
          <LocationMap />
        </div>
      </main>
    </div>
  );
}
