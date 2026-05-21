"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const brazilStatesGeoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

const countryTranslationMap: Record<string, string> = {
    "United States": "Estados Unidos",
    "United Kingdom": "Reino Unido",
    "South Korea": "Coreia do Sul",
    "North Korea": "Coreia do Norte",
    "United Arab Emirates": "Emirados Árabes Unidos",
    "Saudi Arabia": "Arábia Saudita",
    "Czech Republic": "República Tcheca",
    "Ivory Coast": "Costa do Marfim",
    "Democratic Republic of the Congo": "República Democrática do Congo",
    "Republic of the Congo": "República do Congo",
    "Sierra Leone": "Serra Leoa",
    "Bosnia and Herzegovina": "Bósnia e Herzegovina",
    "Trinidad and Tobago": "Trindade e Tobago",
    "New Zealand": "Nova Zelândia",
    "South Africa": "África do Sul",
    "Cabo Verde": "Cabo Verde",
    "El Salvador": "El Salvador",
    "Federated States of Micronesia": "Estados Federados da Micronésia",
    "Vatican": "Vaticano",
    "Swaziland": "Suazilândia",
    "Canada": "Canadá",
    "Germany": "Alemanha",
    "Portugal": "Portugal",
    "Uruguay": "Uruguai",
    "Paraguay": "Paraguai",
    "France": "França",
    "Chile": "Chile",
    "Japan": "Japão",
    "Italy": "Itália",
    "Bolivia": "Bolívia",
    "Peru": "Peru",
    "Australia": "Austrália",
    "China": "China",
    "Netherlands": "Holanda",
    "Argentina": "Argentina",
    "Angola": "Angola",
    "Singapore": "Cingapura",
    "Belgium": "Bélgica",
    "Colombia": "Colômbia",
    "Cuba": "Cuba",
    "Ecuador": "Equador",
    "Guyana": "Guiana",
    "Indonesia": "Indonésia",
    "Puerto Rico": "Porto Rico",
    "Egypt": "Egito",
    "Spain": "Espanha",
    "French Guiana": "Guiana Francesa",
    "Israel": "Israel",
    "Kuwait": "Kuwait",
    "Venezuela": "Venezuela",
    "Estonia": "Estônia",
    "Greece": "Grécia",
    "Mexico": "México",
    "Poland": "Polônia",
    "Vietnam": "Vietnã",
};

const fixedHighlightCountries = new Set([
    "United States",
    "Portugal",
    "Uruguay",
    "Canada",
    "Germany",
    "Paraguay",
    "France",
    "Chile",
    "Japan",
    "Italy",
    "Bolivia",
    "Peru",
    "Australia",
    "China",
    "Netherlands",
]);

const secondaryHighlightCountries = new Set([
    "Argentina",
    "Angola",
    "Singapore",
    "Saudi Arabia",
    "Belgium",
    "Colombia",
    "Cuba",
    "Ecuador",
    "Guyana",
    "Indonesia",
    "Puerto Rico",
    "Egypt",
    "Spain",
    "French Guiana",
    "Israel",
    "Kuwait",
    "Venezuela",
    "United Arab Emirates",
    "Estonia",
    "Greece",
    "Mexico",
    "Poland",
    "United Kingdom",
    "Vietnam",
]);

export default function InteractiveWorldMap() {
    const [hoveredCountry, setHoveredCountry] = useState("");
    const [hoveredState, setHoveredState] = useState("");

    const handleMouseEnter = (countryName: string) => {
        setHoveredCountry(countryName);
    };

    const handleMouseLeave = () => {
        setHoveredCountry("");
    };

    const handleStateMouseEnter = (stateName: string) => {
        setHoveredState(stateName);
    };

    const handleStateMouseLeave = () => {
        setHoveredState("");
    };

    const getCountryLabel = (countryName: string) => {
        return countryTranslationMap[countryName] ?? countryName;
    };

    return (
        <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-N1  shadow-sm shadow-slate-200/50 ">
            <div className="relative">
                <div className=" absolute bottom-10 flex "> 
                  <div className="bg-R5 size-5 mr-2 shadow-[0px_1px_2px_#87240E]"/>
                    <p>Prospectados</p>  
                </div>
                <div className=" absolute bottom-18  flex">
                 <div className="bg-[#ED8068] size-5 mr-2 shadow-[0px_1px_2px_#87240E]"/> <p className="col-span-2">Estudados </p>  
                 </div>
                <ComposableMap
                    projectionConfig={{ scale: 160 }}
                    className="mx-auto h-[500px] w-full max-w-screen-2xl "
                >
                    <defs>
                        <pattern
                            id="dot-grid"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect width="10" height="10" fill="#B1AFAF" />
                            <circle cx="2" cy="2" r="1.2" fill="none" />
                        </pattern>
                    </defs>

                    <ZoomableGroup zoom={1.5} minZoom={1.5} maxZoom={10}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const countryName = geo.properties?.name ?? "País Desconhecido";
                                    const translated = getCountryLabel(countryName);
                                    const isHovered = hoveredCountry === countryName;
                                    const isFirstFixedCountry = fixedHighlightCountries.has(countryName);
                                    const isSecondFixedCountry = secondaryHighlightCountries.has(countryName);
                                    const defaultFill = isHovered
                                        ? "#00081B"
                                        : isSecondFixedCountry
                                            ? "#C55A42"
                                            : isFirstFixedCountry
                                                ? "#87240E"
                                                : "url(#dot-grid)";
                                    const fillClass = isHovered
                                        ? "fill-[#00081B]"
                                        : isSecondFixedCountry
                                            ? "fill-[#ED8068]"
                                            : isFirstFixedCountry
                                                ? "fill-[#87240E]"
                                                : "fill-slate-100";

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`País: ${translated}`}
                                            data-tooltip-id="world-tooltip"
                                            data-tooltip-content={translated}
                                            className={`transition-colors duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-50 ${fillClass} stroke-slate-200`}
                                            style={{
                                                default: {
                                                    fill: defaultFill,
                                                    stroke: "#e2e8f0",
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: "#00081B",
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: "#00081B",
                                                    outline: "none",
                                                },
                                            }}
                                            onMouseEnter={() => handleMouseEnter(countryName)}
                                            onMouseLeave={handleMouseLeave}
                                            onFocus={() => handleMouseEnter(countryName)}
                                            onBlur={handleMouseLeave}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    setHoveredCountry(countryName);
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {/* Brazilian states overlay (renders on top of countries) */}
                        <Geographies geography={brazilStatesGeoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const stateName = geo.properties?.name ?? "Estado Desconhecido";
                                    const isStateHovered = hoveredState === stateName;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            tabIndex={0}
                                            role="button"
                                            aria-label={`Estado: ${stateName}`}
                                            data-tooltip-id="world-tooltip"
                                            data-tooltip-content={stateName}
                                            className={`transition-colors duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-50 ${isStateHovered ? 'fill-[#1E3A8A]' : 'fill-[#93C5FD]'} stroke-slate-300`}
                                            style={{
                                                default: {
                                                    fill: isStateHovered ? '#1E3A8A' : 'url(#dot-grid)',
                                                    stroke: '#e2e8f0',
                                                    strokeWidth: 0.4,
                                                    outline: 'none',
                                                },
                                                hover: {
                                                    fill: '#00081B',
                                                    outline: 'none',
                                                },
                                                pressed: {
                                                    fill: '#00081B',
                                                    outline: 'none',
                                                },
                                            }}
                                            onMouseEnter={() => handleStateMouseEnter(stateName)}
                                            onMouseLeave={handleStateMouseLeave}
                                            onFocus={() => handleStateMouseEnter(stateName)}
                                            onBlur={handleStateMouseLeave}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>

                <Tooltip
                    id="world-tooltip"
                    place="top"
                    variant="light"
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-lg shadow-slate-900/5"
                    style={{ pointerEvents: "none" }}
                    offset={10}
                />
            </div>
        </div>
    );
}
