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
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const normalized = String(value ?? "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
}

function getMunicipalityCode(row = {}) {
  return (
    row.D1C ||
    row.D2C ||
    row.D3C ||
    row.D4C ||
    row.D5C ||
    row.D6C ||
    row.N6C ||
    row.municipalityCode ||
    null
  );
}

function getMunicipalityName(row = {}) {
  return (
    row.D1N ||
    row.D2N ||
    row.D3N ||
    row.D4N ||
    row.D5N ||
    row.D6N ||
    row.N6N ||
    row.municipalityName ||
    null
  );
}

function isMunicipalityCode(value) {
  const digits = String(value || "")
    .replace(/\D/g, "");

  return digits.length === 7;
}

function findMunicipalityCode(row = {}) {
  const directCode = getMunicipalityCode(row);

  if (isMunicipalityCode(directCode)) {
    return String(directCode).replace(/\D/g, "");
  }

  for (const [key, value] of Object.entries(row)) {
    if (
      key.endsWith("C") &&
      isMunicipalityCode(value)
    ) {
      return String(value).replace(/\D/g, "");
    }
  }

  return null;
}

function findMunicipalityName(row = {}) {
  const directName = getMunicipalityName(row);

  if (
    directName &&
    String(directName).trim() &&
    !/^\d+$/.test(String(directName).trim())
  ) {
    return String(directName).trim();
  }

  for (const [key, value] of Object.entries(row)) {
    if (
      key.endsWith("N") &&
      typeof value === "string" &&
      value.trim() &&
      !/^(município|municipio|nível territorial)$/i.test(
        value.trim()
      )
    ) {
      return value.trim();
    }
  }

  return null;
}

export async function getIbgeMunicipalPopulations() {
  const response = await fetch(
    IBGE_POPULATION_URL,
    {
      headers: {
        Accept: "application/json"
      }
    }
  );

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

  return rows
    .slice(1)
    .map((row) => {
      const municipalityCode =
        findMunicipalityCode(row);

      const municipalityName =
        findMunicipalityName(row);

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

export async function getTocantinsMunicipalPopulations() {
  const municipalities =
    await getIbgeMunicipalPopulations();

  return municipalities.filter(
    (municipality) =>
      String(municipality.municipalityCode)
        .startsWith("17")
  );
}

export async function findIbgeMunicipality(
  municipalityName
) {
  if (!municipalityName) {
    return null;
  }

  const normalizedSearch =
    normalizeText(municipalityName);

  const municipalities =
    await getTocantinsMunicipalPopulations();

  return (
    municipalities.find(
      (municipality) =>
        municipality.normalizedName ===
        normalizedSearch
    ) || null
  );
}

export async function getTocantinsPopulation() {
  const municipalities =
    await getTocantinsMunicipalPopulations();

  return municipalities.reduce(
    (total, municipality) =>
      total + toNumber(municipality.population),
    0
  );
}

export function calculatePopulationCoverage(
  reach,
  population
) {
  const normalizedReach =
    toNumber(reach);

  const normalizedPopulation =
    toNumber(population);

  if (
    normalizedReach < 0 ||
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
