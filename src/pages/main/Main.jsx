import Agency from "../../components/agency/Agency";
import ContactUs from "../../components/contact-us/ContactUs";
import Gallery from "../../components/gallery/Gallery";
import Landing from "../../components/landing/Landing";
import Services from "../../components/services/Services";

function Main() {
  return (
    <>
      <Landing />
      <Agency />
      <Services />
      <ContactUs />   
      <Gallery />
    </>
  );
}

export default Main;
