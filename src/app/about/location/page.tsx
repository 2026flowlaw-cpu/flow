import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import LocationHero from '@/components/Location/LocationHero/LocationHero';
import LocationMap from '@/components/Location/LocationMap/LocationMap';
import LocationVision from '@/components/Location/LocationVision/LocationVision';
import LocationGallery from '@/components/Location/LocationGallery/LocationGallery';
import MainCarousel from '@/components/Location/MainCarousel/MainCarousel';
import InquiryForm from '@/components/Location/InquiryForm/InquiryForm';

export default function LocationPage() {
  return (
    <main>
      <Header />
      <LocationHero />
      <LocationMap />
      <LocationVision />
      <LocationGallery />
      <MainCarousel />
      <InquiryForm />
      <Footer />
    </main>
  );
}
