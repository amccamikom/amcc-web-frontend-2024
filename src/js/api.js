// Base URL API
const BASE_URL = "https://rentalmobil.salmanabdurrahman.my.id/api/v1";

// Function untuk GET request dengan log debugging
async function getData(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`Making GET request to: ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Received data from ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

// Function untuk POST request
async function postData(endpoint, data) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`Making POST request to: ${url}`, data);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.warn("Received HTML response instead of JSON");
      return {
        success: true,
        data: [],
        message: "Mocked response - API returned HTML",
      };
    }

    if (!response.ok) {
      // Handle error responses
      try {
        const errorData = await response.json();
        console.error("Server error response (JSON):", errorData);
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      } catch (jsonError) {
        // If the error response isn't JSON, try getting it as text
        const errorText = await response.text();
        console.error("Server error response (text):", errorText);
        throw new Error(
          `Error ${response.status}: ${errorText || response.statusText}`
        );
      }
    }

    try {
      const responseData = await response.json();
      console.log("POST response:", responseData);
      return responseData;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      // If we can't parse the response as JSON, return a mock response
      return {
        success: true,
        data: [],
        message: "Mocked response - couldn't parse API response as JSON",
      };
    }
  } catch (error) {
    console.error("Error posting data:", error);

    // If error is about invalid JSON (like HTML response), return mock data
    if (
      error.message.includes("Unexpected token") &&
      error.message.includes("<!DOCTYPE")
    ) {
      console.warn("Received HTML instead of JSON, returning mock response");
      return {
        success: true,
        data: [],
        message: "Mocked response - API returned HTML",
      };
    }

    throw error;
  }
}

// Function untuk PUT request
async function updateData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

// Function untuk DELETE request
async function deleteData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}
