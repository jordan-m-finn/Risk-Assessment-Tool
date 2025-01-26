import axios from "axios";

interface EmailVerificationResponse {
  valid: boolean;
  details?: string;
  confidenceScore?: string;
}

export async function verifyEmail(emailAddress: string): Promise<EmailVerificationResponse> {
  const apiKey = "L2MKVB9H3Mo6ByI_P1TdqF**nSAcwXpxhQ0PC2lXxuDAZ-**";
  const url = "https://globalemail.melissadata.net/V3/WEB/GlobalEmail/doGlobalEmail";

  const params = {
    id: apiKey,
    email: emailAddress,
    format: "json",
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    if (data.TotalRecords === "1") {
      const record = data.Records[0];
      const results = record.Results || "";
      const confidenceScore = record.DeliverabilityConfidenceScore || "";

      if (results.includes("ES")) {
        return {
          valid: true,
          confidenceScore,
        };
      } else {
        return {
          valid: false,
          details: results,
        };
      }
    }

    return {
      valid: false,
      details: "No records found",
    };
  } catch (error: any) {
    console.error("Error verifying email:", error.message);
    return {
      valid: false,
      details: "HTTP request failed",
    };
  }
}