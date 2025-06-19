// Base URL API
const BASE_URL = "https://rentalmobil.salmanabdurrahman.my.id/api/v1";

// Function untuk GET request
async function getData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("text/html")) {
      return { success: true, data: [] };
    }
    return await response.json();
  } catch (error) {
    return { success: false, data: [], message: error.message };
  }
}

// Function untuk POST request
async function postData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // menghandle untuk data yang tidak dalam format JSON
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("text/html")) {
      return { success: true, data: [] };
    }
    return await response.json();
  } catch (error) {
    return { success: false, data: [], message: error.message };
  }
}

// Function untuk PUT request

// Function untuk DELETE request
