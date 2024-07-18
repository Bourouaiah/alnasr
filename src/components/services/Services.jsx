import { servicesData } from "../../../data";

function Services() {
  return (
    <section className="px-[20px] md:px-[50px] py-[50px]">
      <h1 className="text-[30px] lg:text-[54px] text-center font-semibold">Facilities We Provide For You</h1>
      <p className="text-[15px] lg:text-[18px] text-center">
        We provide comfort for our customers, with the various facilities we
        provide that we provide
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[50px] gap-[30px]">
        {servicesData.map((service, index) => (
          <div className="card-shadow px-[10px] py-[20px] rounded-lg" key={index}>
            <h2 className="text-center mb-[10px] text-[18px] font-medium">{service.title}</h2>
            <p className="text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
