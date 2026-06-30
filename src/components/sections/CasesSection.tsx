import { CaseCard } from "../cards/CaseCard";
import cases from "../../data/cases";

function IconFolder() {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0007 37.3333L20.0007 29.6C20.4355 28.7364 21.097 28.0072 21.9143 27.4905C22.7316 26.9739 23.674 26.6891 24.6407 26.6667H53.334M53.334 26.6667C54.1487 26.6653 54.953 26.8505 55.685 27.2082C56.417 27.566 57.0574 28.0866 57.5569 28.7303C58.0563 29.374 58.4017 30.1236 58.5665 30.9215C58.7313 31.7194 58.711 32.5445 58.5073 33.3333L54.4007 49.3333C54.1035 50.4842 53.4305 51.5028 52.4884 52.2275C51.5464 52.9521 50.3892 53.3414 49.2007 53.3333H10.6673C9.25283 53.3333 7.89628 52.7714 6.89608 51.7712C5.89589 50.7711 5.33398 49.4145 5.33398 48V13.3333C5.33398 11.9189 5.89589 10.5623 6.89608 9.56211C7.89628 8.56192 9.25283 8.00001 10.6673 8.00001H21.0673C21.9593 7.99127 22.8392 8.20638 23.6265 8.62567C24.4138 9.04495 25.0834 9.65501 25.574 10.4L27.734 13.6C28.2196 14.3374 28.8807 14.9427 29.658 15.3616C30.4353 15.7805 31.3044 15.9999 32.1873 16H48.0007C49.4151 16 50.7717 16.5619 51.7719 17.5621C52.7721 18.5623 53.334 19.9189 53.334 21.3333V26.6667Z" stroke="#87240E" strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const CasesSection = () => {
    return (
        <section id="cases" className="font-montserrat">
            <div className="max-w-[85%] md:max-w-[75%] mx-auto mt-[90px]">
                <div className="flex flex-col gap-[8px] md:gap-[2px] w-[577px] h-[190px]">
                    <p className="text-[16px] md:text-[20px] tracking-[25%] leading-[100%]">
                        • Portfolio e Resultados
                    </p>
                    <div className="flex items-center">
                        <div className="w-[32px] h-[32px] md:w-[64px] md:h-[64px] mr-[16px]">
                            <IconFolder />
                        </div>
                        <h1 className="font-impact font-bold text-[40px] md:text-[76px] leading-[100%] md:leading-[82px]">
                            Nossos <span className="text-[#87240E]">cases</span>
                        </h1>
                    </div>
                    <p className="text-[18px] md:text-[20px] max-w-[360px] md:max-w-auto">
                        Inspire-se com as histórias de quem já confiou no nosso trabalho.
                    </p>
                </div>
            </div>
           
            <div className="flex flex-wrap justify-center grid-cols-1 w-[85%] md:w-[75%] mx-auto md:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-items-center">
                {cases.map((caseItem, index) => (
                    <CaseCard
                        key={index}
                        slug={caseItem.slug}
                        title={caseItem.title}
                        description={caseItem.description}
                        imageSrc={caseItem.imageSrc}
                    />
                ))}
            </div>
        </section>
    )
};

export default CasesSection