import Hero from '@/components/Hero/Hero';
import Stats from '@/components/Stats/Stats';
import PracticeAreas from '@/components/PracticeAreas/PracticeAreas';
import OrganicConnectivity from '@/components/OrganicConnectivity/OrganicConnectivity';
import CustomerReviews from '@/components/CustomerReviews/CustomerReviews';
import CTA from '@/components/CTA/CTA';
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
        <CustomerReviews isMain={true} />
        <CTA />
        
        {/* Location Section */}
        <section className={styles.locationSection}>
          <div className="container">
            <h2 className={styles.locationTitle}>오시는 길</h2>
          </div>
          <LocationMap />
        </section>
      </main>
    </div>
  );
}
