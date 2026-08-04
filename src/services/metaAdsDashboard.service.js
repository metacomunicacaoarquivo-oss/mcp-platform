function normalizeMunicipalityName(value = "") {
  return normalizeText(value)
    .replace(/\bmunicipio de\b/g, "")
    .replace(/\bmunicipio do\b/g, "")
    .replace(/\bmunicipio da\b/g, "")
    .replace(/\bto\b$/g, "")
    .replace(/\btocantins\b$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function prepareTocantinsPopulationData(
  municipalities = []
) {
  const normalizedMunicipalities = municipalities
    .map((municipality) => {
      const searchableName =
        normalizeMunicipalityName(
          municipality.municipalityName
        );

      const nameTokens = searchableName
        .split(" ")
        .filter(Boolean);

      return {
        ...municipality,
        searchableName,
        nameTokens
      };
    })
    .filter(
      (municipality) =>
        municipality.municipalityCode &&
        municipality.municipalityName &&
        municipality.searchableName &&
        municipality.nameTokens.length > 0 &&
        toNumber(municipality.population) > 0
    )
    .sort(
      (municipalityA, municipalityB) =>
        municipalityB.nameTokens.length -
          municipalityA.nameTokens.length ||
        municipalityB.searchableName.length -
          municipalityA.searchableName.length
    );

  const municipalityIndex = new Map();

  for (const municipality of normalizedMunicipalities) {
    municipalityIndex.set(
      municipality.searchableName,
      municipality
    );
  }

  const statePopulation =
    normalizedMunicipalities.reduce(
      (total, municipality) =>
        total + toNumber(municipality.population),
      0
    );

  return {
    municipalities: normalizedMunicipalities,
    municipalityIndex,
    statePopulation: Math.round(statePopulation)
  };
}

function findMunicipalityInCampaign(
  campaignName,
  tocantinsPopulationData
) {
  const normalizedCampaignName =
    normalizeText(campaignName);

  if (!normalizedCampaignName) {
    return null;
  }

  const campaignTokens = normalizedCampaignName
    .split(" ")
    .filter(Boolean);

  const {
    municipalityIndex,
    municipalities
  } = tocantinsPopulationData;

  /*
   * Primeiro procura sequências de palavras do nome
   * da campanha diretamente no índice dos municípios.
   *
   * Exemplo:
   * "[ENG] Porto Nacional - Apoio"
   * identifica "porto nacional".
   */
  const maximumTokenLength = Math.min(
    5,
    campaignTokens.length
  );

  for (
    let tokenLength = maximumTokenLength;
    tokenLength >= 1;
    tokenLength -= 1
  ) {
    for (
      let startIndex = 0;
      startIndex <=
      campaignTokens.length - tokenLength;
      startIndex += 1
    ) {
      const candidate = campaignTokens
        .slice(
          startIndex,
          startIndex + tokenLength
        )
        .join(" ");

      const municipality =
        municipalityIndex.get(candidate);

      if (municipality) {
        return municipality;
      }
    }
  }

  /*
   * Busca alternativa para garantir que nomes compostos
   * também sejam encontrados mesmo com símbolos,
   * prefixos ou textos adicionais.
   */
  const campaignWithBoundaries =
    ` ${normalizedCampaignName} `;

  return (
    municipalities.find((municipality) => {
      const municipalityWithBoundaries =
        ` ${municipality.searchableName} `;

      return campaignWithBoundaries.includes(
        municipalityWithBoundaries
      );
    }) || null
  );
}
