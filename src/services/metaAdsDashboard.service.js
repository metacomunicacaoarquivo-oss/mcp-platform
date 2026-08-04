function createGeographicData(
  campaignName,
  reach,
  tocantinsPopulationData
) {
  const municipality =
    findMunicipalityInCampaign(
      campaignName,
      tocantinsPopulationData
    );

  /*
   * Quando um município do Tocantins aparece
   * no nome da campanha, ela é municipal.
   */
  if (municipality) {
    const population = Math.round(
      toNumber(municipality.population)
    );

    return {
      geographicScope: {
        type: "municipal",
        label: "Municipal",
        municipality:
          municipality.municipalityName,
        municipalityCode:
          municipality.municipalityCode,
        state: "Tocantins",
        stateCode: "TO"
      },

      ibge: {
        scope: "municipal",

        municipality:
          municipality.municipalityName,

        municipalityCode:
          municipality.municipalityCode,

        state: "Tocantins",

        stateCode: "TO",

        population,

        reach: Math.round(
          toNumber(reach)
        ),

        coveragePercentage:
          calculatePopulationCoverage(
            reach,
            population
          ),

        coverageLabel:
          "Cobertura estimada da população",

        referenceYear:
          municipality.referenceYear || 2025,

        source:
          municipality.source ||
          "IBGE/SIDRA",

        table:
          municipality.table || "6579",

        detectionRule:
          "Município identificado no nome da campanha",

        warning:
          "O alcance da Meta representa contas únicas estimadas e não confirma residência individual."
      }
    };
  }

  /*
   * Quando nenhum município aparece no nome,
   * a campanha é considerada estadual.
   */
  const statePopulation =
    tocantinsPopulationData.statePopulation;

  return {
    geographicScope: {
      type: "state",
      label: "Estadual",
      municipality: null,
      municipalityCode: null,
      state: "Tocantins",
      stateCode: "TO"
    },

    ibge: {
      scope: "state",

      municipality: null,

      municipalityCode: null,

      state: "Tocantins",

      stateCode: "TO",

      population:
        statePopulation,

      reach: Math.round(
        toNumber(reach)
      ),

      coveragePercentage:
        calculatePopulationCoverage(
          reach,
          statePopulation
        ),

      coverageLabel:
        "Cobertura estimada da população estadual",

      referenceYear: 2025,

      source: "IBGE/SIDRA",

      table: "6579",

      detectionRule:
        "Nenhum município foi identificado no nome da campanha; campanha classificada como estadual",

      warning:
        "O alcance da Meta representa contas únicas estimadas e não confirma residência individual."
    }
  };
}
