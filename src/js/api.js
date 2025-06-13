// Base URL API
const BASE_URL = "https://rentalmobil.salmanabdurrahman.my.id/api/v1";

// Function untuk GET request
async function getData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      return { success: true, data: [] };
    }
    
    return await response.json();
  } catch (error) {
    return { success: false, data: [], message: error.message };
  }
}

// Function untuk PUT request
async function updateData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Function untuk DELETE request
async function deleteData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE"
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}