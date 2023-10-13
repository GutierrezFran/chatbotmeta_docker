// Autenticacion e insercion de respuestas del usuario en Google Sheet


const { google } = require("googleapis");
require("dotenv").config();

async function getAuthSheets() {
const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJ/bQuoAyJIwtl\ngjM3Z5wNuvlkMtHsscMPzFPHA4wR1Ie86pXNW7H+Wz0sN36vrl1xhS/j+3OmnmPu\nikPwAhaj4ZW4/PUX2jHsxnZnxgGlMan+NAELzLynom3eoASBHdP/3elDGmX6lnTJ\nA7Kamks+JwBpaT8uaDhZeEcDqdbhV2kZUwNzF2fFvCxgcb14g28UM7a6dLCyOlWx\nUjAJHTksC4nSTHFCvKUwP5O6QuChe6L5gKb4M4xJK+E1qMltIxC8KHtIOiHpEMV0\ndH2y2w1zbDoun4t7aRvX1ZGf3a/gG2zpPGx2H315YQzowZAF7EC+8ZGxElagMzDs\nc9v89B1RAgMBAAECggEAB1ChJbadWZqLqzyKuQkPJ1aj+TdXb55U6XWte4Wy/QLQ\nuxxWOjqFwMfCWH92fqt+fhHUFQoqSyiNhyoZ8X9L3Vm6K7m6cQeRewkJaPLsZJR+\nuuJcftZGZz48Qx2RqDDhuHCLheb29jscZdq0zUFE9A5ixw59D6PN1Zyj2ru7+Mta\nbL59Zh3Ndnsppef/Fec/AxCU2wXg+IKN9tKWlueGjOkD6i0JOYf1gUTap5818xjp\nTAjgmxmswc//prNjWFpNf3ZpYOrye37TIZjzWVLyBQdOiNSD8qcujNdTwHOaQ7pQ\nlsp0f8ItILZRhiOGvqtSF/rv6cFg+HPSk2+CVvvBQQKBgQD5E6X/CThsiAqvOIyF\nQ0OIVqhKtEPcYBNEnVo9gBij0J+Z33ZPvThb0o9gezUPzxPfpGHSZDOHgGqST2+O\nWYWq11Q+Cm6jI6tXhGN2s+xEWpgi1lTZVH9Ctn7MP5hMWLm7cwRaV2lcLgyJSmIZ\npC1k9zfwsuvs/UsZrrvN2SUPsQKBgQDPmwIekopr6f3JyQcMj6g9wKYqy8xGRue2\nm4GvT2uETuOQJTbCm60iyzK8iCjJjGBpqdrtxECJS6xtVfBPbF7QH8JWazzUbydC\nc0X7AcJnNsCWjgryGMT2xtPzJb50ml7XUup/0iL2f4BVyAeX5/zg5e/eX4hXc9+i\nShm/6a/voQKBgDfQnVwfVtOLUMmfJG4gepusv52t858IsIipsjUh5WOgNoOmvb50\nqpJ5BsQaF/Po9Y0iKwGYjquIrVkID/mYOgnkou4cLFrGfXjpI9jPzNwsaPc1jGH/\nO11Zw+RFQ/2nzEcjKRCNkgCkGQ8S6hTQ45NCiviXP6Mlx5SDwXYJePKhAoGAZGoy\nXT0+DLJSGc7NRQsbMjtDZEHM3VUgcJfI41XDyGwr76XAVeLcnI6yTLSDHfFzFMie\nZxDcskvS69N8d74QIhSqeAhIlOvqjl6ZQ653LFs0Td4Id075ve8vx1TDSTz9kKK/\nX/HxDU9gcJ1e5t/D1bgCDIoitUILskCrMcNDYOECgYADhhegvC+YBSQ6Bn1XMpEs\nvXTKA7MMr3IpSqC2lJVLkPKGNkxUxKvIIiBV5X5I8p3hjNwx/VCi8lna+xhZnLxF\n9LYCYOJIk/3WREpiZTH8UujAzSshUHkSNGXI/yJr+n9wGv2MZDdOpzef1oFbGFhy\n1rEdKMD2HrJWPJiigMWJeA==\n-----END PRIVATE KEY-----\n"
}
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });  

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

//Insertar registros
async function createRecord(collect_data, nameSheet){

  try{

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets(); 
    const valuesToInsert = [
      collect_data    
    ];

    const resource = {
      values: valuesToInsert
    };

    const response = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: nameSheet,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource
    });

    console.log('Registro insertado correctamente: ', response)

  }catch(error){
    console.log(`Error al insertar registro en ${nameSheet}:`, error)
  }

}

module.exports = {
  createRecord
}
