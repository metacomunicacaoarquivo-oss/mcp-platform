const IBGE_POPULATION_URL =
  "https://apisidra.ibge.gov.br/values/t/6579/n6/all/v/9324/p/2025";

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toNumber(value) {
  const normalized = String(value ?? "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
}

export async function getIbgeMunicipalPopulations() {
  const response = await fetch(IBGE_POPULATION_URL);

  if (!response.ok) {
    const error = new Error(
      "Falha ao consultar os dados populacionais do IBGE."
    );

    error.status = response.status;
    throw error;
  }

  const rows = await response.json();

  if (!Array.isArray(rows) || rows.length <= 1) {
    const error = new Error(
      "O IBGE não retornou dados populacionais válidos."
    );

    error.status = 502;
    throw error;
  }

  const dataRows = rows.slice(1);

  return dataRows
    .map((row) => {
      const municipalityCode =
        row.D6C || row.N6C || null;

      const municipalityName =
        row.D6N || row.N6N || null;

      const population =
        toNumber(row.V);

      return {
        municipalityCode,
        municipalityName,
        normalizedName:
          normalizeText(municipalityName),
        population,
        referenceYear: 2025,
        source: "IBGE/SIDRA",
        table: "6579"
      };
    })
    .filter(
      (item) =>
        item.municipalityCode &&
        item.municipalityName &&
        item.population > 0
    );
}

export async function findIbgeMunicipality(
  municipalityName,
  stateCode = null
) {
  if (!municipalityName) {
    return null;
  }

  const normalizedSearch =
    normalizeText(municipalityName);

  const municipalities =
    await getIbgeMunicipalPopulations();

  const matches = municipalities.filter(
    (municipality) =>
      municipality.normalizedName ===
      normalizedSearch
  );

  if (matches.length === 0) {
    return null;
  }

  if (!stateCode) {
    return matches[0];
  }

  const normalizedStateCode =
    String(stateCode).trim();

  return (
    matches.find((municipality) =>
      String(municipality.municipalityCode)
        .startsWith(normalizedStateCode)
    ) || matches[0]
  );
}

export function calculatePopulationCoverage(
  reach,
  population
) {
  const normalizedReach = Number(reach);
  const normalizedPopulation = Number(population);

  if (
    !Number.isFinite(normalizedReach) ||
    !Number.isFinite(normalizedPopulation) ||
    normalizedPopulation <= 0
  ) {
    return null;
  }

  return Number(
    (
      (normalizedReach / normalizedPopulation) *
      100
    ).toFixed(2)
  );
}
