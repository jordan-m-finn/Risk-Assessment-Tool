import axios from "axios";

export interface AddressParams {
  addressLine1: string;
  locality: string;
  administrativeArea: string;
  postalCode: string;
  country: string;
}

export async function verifyAddress(address: AddressParams): Promise<boolean> {
  const apiKey = "L2MKVB9H3Mo6ByI_P1TdqF**nSAcwXpxhQ0PC2lXxuDAZ-**";
  const url = "https://address.melissadata.net/v3/WEB/GlobalAddress/doGlobalAddress";

  const params = {
    id: apiKey,
    a1: address.addressLine1,
    loc: address.locality,
    admarea: address.administrativeArea,
    postal: address.postalCode,
    ctry: address.country,
    format: "json",
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    if (data.TotalRecords === "1") {
      const record = data.Records[0];
      const results = record.Results || "";
      return results.includes("AV");
    }
    return false;
  } catch (error) {
    console.error("Error verifying address:", error.message);
    return false;
  }
}