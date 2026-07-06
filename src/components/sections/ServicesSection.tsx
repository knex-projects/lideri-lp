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
            <div className="mx-auto mt-[90px] max-w-[85%] md:max-w-[75%]">
                <div className="flex h-[190px] max-w-[500px] flex-col gap-[8px] md:gap-[2px] lg:max-w-[800px]">
                    <p className="text-[16px] leading-[100%] tracking-[25%] md:text-[18px] lg:text-[20px]">
                        • Nossas soluções
                    </p>
                    <div className="flex items-center">
                        <div className="mr-[16px] h-[32px] w-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]">
                            <IconCompass />
                        </div>
                        <h1 className="font-impact text-[40px] leading-[100%] md:text-[58px] lg:text-[76px] lg:leading-[82px]">
                            Nossos <span className="text-[#87240E]">serviços</span>
                        </h1>
                    </div>
                    <p className="max-w-[600px] text-[18px] md:max-w-auto md:text-[19px] lg:text-[20px]">
                        Soluções estratégicas para escalar o seu negócio.
                    </p>
                </div>

                <div className="lg:mt-16 flex flex-col gap-10">
                    {serviceGroups.map((group) => (
                        <div key={group.title} className="mt-[8px]">
                            <div className="flex flex-col gap-[32px]">
                                <div className='flex gap-[16px] items-center'>
                                    <div className='w-[4px] h-[38px] rounded-[8px] bg-[#000E31]'></div>
                                    <h2 className='font-impact text-[32px] md:text-[40px] lg:text-[48px]'>
                                        {group.title.split(' ').slice(0, -1).join(' ')}{' '}
                                        <span className="text-[#87240E]">{group.title.split(' ').pop()}</span>
                                    </h2>
                                </div>
                                <hr className='border-[1px] border-[#B1AFAF] w-full'/>
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