import { ServiceCard } from '../cards/ServiceCard';
import { serviceGroups } from '../../data/services';

function IconCompass() {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.0007 58.6667C46.7282 58.6667 58.6673 46.7276 58.6673 32C58.6673 17.2724 46.7282 5.33337 32.0007 5.33337C17.2731 5.33337 5.33398 17.2724 5.33398 32C5.33398 46.7276 17.2731 58.6667 32.0007 58.6667Z" stroke="#87240E" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M43.3067 20.6934L38.496 35.1227C38.2342 35.9082 37.7931 36.622 37.2076 37.2076C36.622 37.7931 35.9082 38.2342 35.1227 38.496L20.6934 43.3067L25.504 28.8774C25.7658 28.0918 26.207 27.378 26.7925 26.7925C27.378 26.207 28.0918 25.7658 28.8774 25.504L43.3067 20.6934Z" stroke="#87240E" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const ServicesSection = () => {
    return (
        <section id="services" className="font-montserrat">
            <div className="mx-auto mt-22.5 max-w-[85%] md:max-w-[75%]">
                <div className="flex h-47.5 max-w-125 flex-col gap-2 md:gap-0.5 lg:max-w-200">
                    <p className="text-[1rem] leading-[100%] tracking-[25%] md:text-[1.125rem] lg:text-[1.25rem]">
                        • Nossas soluções
                    </p>
                    <div className="flex items-center">
                        <div className="mr-4 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16">
                            <IconCompass />
                        </div>
                        <h1 className="font-impact text-[2.5rem] leading-[100%] md:text-[3.625rem] lg:text-[4.75rem] lg:leading-[5.125rem]">
                            Nossos <span className="text-[#87240E]">serviços</span>
                        </h1>
                    </div>
                    <p className="max-w-150 text-[1.125rem] md:max-w-auto md:text-[1.1875rem] lg:text-[1.25rem]">
                        Soluções estratégicas para escalar o seu negócio.
                    </p>
                </div>

                <div className="lg:mt-16 flex flex-col gap-10">
                    {serviceGroups.map((group) => (
                        <div key={group.title} className="mt-2">
                            <div className="flex flex-col gap-8">
                                <div className='flex gap-4 items-center'>
                                    <div className='w-1 h-9.5 rounded-[0.5rem] bg-[#000E31]'></div>
                                    <h2 className='font-impact text-[2rem] md:text-[2.5rem] lg:text-[3rem]'>
                                        {group.title.split(' ').slice(0, -1).join(' ')}{' '}
                                        <span className="text-[#87240E]">{group.title.split(' ').pop()}</span>
                                    </h2>
                                </div>
                                <hr className='border-[0.0625rem] border-[#B1AFAF] w-full'/>
                            </div>
                            <div className="">
                                {group.services.map((service) => (
                                    <ServiceCard
                                        key={service.title}
                                        title={service.title}
                                        description={service.description}
                                        expandedDescription={service.extendedDescription}
                                        benefits={service.benefits}
                                        icon={service.icon}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;