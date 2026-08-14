import {
    acaiImg,
    beerImg,
    craftsmanImg,
    icecreamImg,
    lacemakerImg,
} from "@/public/assets";
const cases = [
    {
        slug: "internacionalizacao-de-sorvetes",
        title: "Internacionalização de Sorvetes",
        description: "Estudo estratégico e plano burocrático para internacionalizar marca de sorvetes, estruturando de forma sólida a base de futuras exportações.",
        entryEstrategy: "Para contornar as barreiras, a estratégia priorizou uma sólida preparação interna antes da expansão. O processo iniciou com a adequação às rigorosas legislações sanitárias internacionais, garantindo certificações globais e ajustando fórmulas e rótulos. Em paralelo, a operação foi blindada juridicamente por meio do registro internacional da marca e de contratos comerciais seguros. Para a distribuição, optou-se por homologar parceiros locais já especializados na logística da cadeia do frio, reduzindo o risco operacional. Por fim, toda essa estrutura foi validada através de um projeto piloto em um mercado-teste de menor barreira, garantindo a fluidez aduaneira antes de buscar voos mais longos.",
        marketObstacles: "Exportar sorvetes exige a manutenção impecável da cadeia do frio (cold chain) em trajetos transcontinentais, o que eleva significativamente os custos e os riscos de avaria do produto. Paralelamente, o mercado global impõe uma densa barreira burocrática: agências sanitárias rigorosas (como FDA nos EUA ou EFSA na Europa) exigem adequações minuciosas de formulação, controle de alergênicos, rastreabilidade de ingredientes e padrões de rotulagem específicos para cada país. Sem um alicerce jurídico e logístico robusto, qualquer tentativa de entrada em um novo país corre o risco de ser barrada nas alfândegas ou se tornar financeiramente insustentável",
        scalability: "Ao construir essa espinha dorsal burocrática e logística, a marca não apenas concretiza sua primeira exportação, mas cria um modelo de negócios replicável e altamente escalável. Os ganhos de curto prazo incluem a diversificação de receitas, com a entrada de capital em moeda forte (dólar/euro), protegendo a empresa contra flutuações e sazonalidades do mercado interno. A médio e longo prazo, o grande trunfo é a escalabilidade do modelo: uma vez que os processos de adequação sanitária, formulação internacional e logística do frio estão padronizados, a entrada em novos países (o chamado rollout) torna-se um processo muito mais rápido e barato. A marca ganha valuation global, aumenta seu poder de negociação com fornecedores através de economias de escala e consolida-se como um player internacional preparado para demandas de alto volume.",
        imageSrc: icecreamImg,
    },
        {
        slug: "projeto-artesao-empreendedor",
        title: "Projeto Artesão Empreendedor",
        description: "Apoio na exportação do artesanato da Paraíba, com foco em plano burocrático e logístico, levando toda a arte local ao mercado internacional.",
        entryEstrategy: "A estratégia combinou o fortalecimento do artesão como marca com a profissionalização do processo de exportação. Foram criados pacotes de produtos adaptados para o comércio exterior e traçados roteiros de workshops e feiras internacionais para gerar visibilidade e testar canais comerciais.",
        marketObstacles: "Os obstáculos incluem a falta de familiaridade dos artesãos com exportação, custos de logística e a necessidade de adaptar os produtos ao gosto internacional sem perder sua essência. Há também barreiras burocráticas de exportação de bens culturais e a exigência de documentação completa para despacho aduaneiro.",
        scalability: "Com a formalização dos processos e a capacitação dos empreendedores locais, o projeto se torna escalável por meio da replicação do modelo para outros grupos de artesãos. A capacidade de atender encomendas maiores e ciclos de feiras internacionais aumenta a escala sem comprometer a autenticidade do produto.",
        imageSrc: craftsmanImg,
    },
    {
        slug: "internacionalizacao-de-acai",
        title: "Internacionalização de Açaí",
        description: "Análise de mercado global e conjuntura para empresa cearense de açaí, focando em identificar países promissores para as futuras exportações.",
        entryEstrategy: "A estratégia foi baseada em mapear exigências sanitárias e preferências de consumo nos mercados-alvo antes de iniciar qualquer operação. Trabalhamos com parceiros locais para validar o posicionamento do açaí em categorias como sucos, polpas congeladas e blends funcionais, e alinhamos a cadeia logística para preservar a qualidade do produto do freezer à prateleira.",
        marketObstacles: "O açaí enfrenta barreiras técnicas e regulatórias em muitos países, sobretudo por ser um alimento fresco/congelado que exige controle de temperatura, certificação fitossanitária e comprovação de origem. Há também a necessidade de educar o consumidor sobre a categoria, já que em mercados não habituados o produto pode ser visto exclusivamente como sobremesa, limitando seu posicionamento.",
        scalability: "Ao estruturar uma cadeia de fornecimento certificada e parceiros de distribuição confiáveis, o projeto passa a ser escalável por meio de formatos modulares: exportação de polpas para indústrias, fornecimento para redes de food service e venda direta ao varejo. Esse modelo permite crescer exportações para múltiplos países sem recriar a estrutura a cada novo destino.",
        imageSrc: acaiImg,
    },
    {
        slug: "internacionalizacao-de-cerveja",
        title: "Cervejaria Freya",
        description: "Preparação para exportar a cerveja artesanal por meio de estudos de mercado, planejamento e prospecção de parceiros para o mercado exterior.",
        entryEstrategy: "A entrada começou por selecionar mercados com maior receptividade à cerveja artesanal e menor barreira regulatória. Em seguida, desenhamos um plano de compliance para exportação de bebidas alcoólicas, garantimos a adequação dos rótulos às normas locais e negociamos com distribuidores que já tinham rodízios específicos para cervejas importadas.",
        marketObstacles: "A exportação de cerveja artesanal esbarra em exigências rígidas de autorização de importação, impostos elevados e limitações logísticas de transporte refrigerado ou pressurizado. Além disso, cada país tem regras próprias de rotulagem de bebidas alcoólicas e restrições quanto ao teor alcoólico e ingredientes.",
        scalability: "Com um processo de exportação padronizado e parceria com distribuidores especializados, o modelo se torna escalável para novas regiões. A cervejaria pode ampliar volume e mix de rótulos em mercados onde o consumo de craft beer cresce, aproveitando economia de escala na produção e no transporte consolidado.",
        imageSrc: beerImg,
    },
    {
        slug: "projeto-rendeiras",
        title: "Projeto Rendeiras",
        description: "Assessoria na internacionalização do artesanato das rendeiras do Cariri, promovendo impacto social e novas oportunidades globais de mercado.",
        entryEstrategy: "A estratégia priorizou a construção de uma narrativa de impacto social alinhada à qualidade do produto, identificando segmentos internacionais dispostos a pagar mais por peças autênticas e sustentáveis. Desenvolvemos canais de venda B2B e parcerias com boutiques e marketplaces que valorizam o artesanato brasileiro.",
        marketObstacles: "Para artesanato, as maiores barreiras são a certificação de origem, o custo de frete e a percepção de valor em mercados estrangeiros. Também há o desafio de adaptar formatos e embalagens ao transporte internacional, reduzindo danos e custos sem perder a identidade cultural.",
        scalability: "Uma vez estabelecida a cadeia de curadoria, produção e logística, o modelo pode crescer incluindo novas comunidades artesanais e ampliando a oferta para públicos segmentados. A exportação de artesanato se torna escalável quando o processo de qualidade e certificação é replicável em outras linhas de produto.",
        imageSrc: lacemakerImg,
    },
];

export default cases;
