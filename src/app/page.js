import Hero from "./components/Home/Hero";
import DesCard from "./components/Home/DesCard";
import Features from "./components/Home/Features";
import AboutUs from "./components/Home/AboutUs";
import WorkProcess from "./components/Home/WorkProcess";
// import Projects from "./components/Home/Projects";
import Opinion from "./components/Home/Opinion";
import WorkWithUs from "./components/Home/WorkWithUs";
import DiscountCard from "./components/Home/DiscountCard";
import Ask from "./components/Home/Ask";
import ContactUs from "./components/Home/ContactUs";

export default function Home() {
  return (
    <>
    
      <Hero />
      <Features />
      <DesCard />
      <AboutUs />
      <WorkProcess />
      {/* <Projects /> */}
      <Opinion />
      <WorkWithUs />
      <DiscountCard />
      <Ask />
      <ContactUs />

    </>
  );
}
