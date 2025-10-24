export const BASE_URL = "http://localhost:3001";

function handleServerResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export function getItems() {
  return fetch(`${BASE_URL}/items`).then(handleServerResponse);
}

export function addItem(inputValues) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputValues),
  }).then(handleServerResponse);
}

export function deleteItem(id) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  }).then(handleServerResponse);
}
