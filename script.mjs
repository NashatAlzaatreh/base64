import fs from "fs";
import axios from "axios";
import ExcelJS from "exceljs";

const apiUrl = "https://fe-uat-apimgmt-service.azure-api.net/v1/frictionless";
const tenantId = "YIB2C";
const maxCellLength = 30000;
const authHeader =
  "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjMxMDJDMDQ3NDY1RjMzQkEzMURFRTNDNUZFNkU3QjcwQTVCQTk4RjciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUVByb3MgVGVzdCIsImdpdmVuX25hbWUiOiJRUHJvcyIsImZhbWlseV9uYW1lIjoiVGVzdCIsInN1YiI6IjA4N2FjY2U5LWM2YzgtNGEwNi05M2ZmLTg1ZWNlZDRkMTlmZiIsImVtYWlscyI6InFwcm9zdGVzdGluZzB3M3dlQGdtYWlsLmNvbSIsImNvdW50cnkiOiIiLCJleHRlbnNpb25fTmF0aW9uYWxpdHkiOiItLSIsImV4dGVuc2lvbl9waG9uZV9udW1iZXIiOiIiLCJleHRlbnNpb25fdG5jIjoidHJ1ZSIsImV4dGVuc2lvbl9NS1QiOiJ0cnVlIiwiZXh0ZW5zaW9uX3VzZXJUeXBlIjoiIiwiZXh0ZW5zaW9uX0NvdW50cnlDb2RlIjoiKzk3MSIsInZlciI6IjEuMCIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNjkxMDkzNzY3LCJhdXRoX3RpbWUiOjE2OTEwOTM3NjcsIm5iZiI6MTY5MTA5Mzc2NywiZXhwIjoxNjkxNjk4NTY3LCJpc3MiOiJodHRwczovL2ZhcmFoYjJjc2l0ZXh0LmIyY2xvZ2luLmNvbS90ZnAvYTk3OGZmNGUtOGM4MS00MzEzLWE1ODEtYjAxNjY1OWZjMThlL2IyY18xYV9zaWdudXBfc2lnbmluX3did2ttc2lfY3VzdG9tdG9rZW4vdjIuMC8iLCJhdWQiOiJkMTZjOWNkNC0xNWQ0LTQ1MmMtYWUyOC1iNDU2ZDViNTE1YzgifQ.LL0aB3ndqRpBNMPFGVdBhszJMAFg9nU4KJCGDAfPOm2H14WBfNKOMyeSoh8P8Hs5zTa7Hnf0rDdqzCifTHvDb-4Yk3PDnweB8Cy8nIXdHYjJxAh4U-Au8LrHqfRLdh8auQfsLop5MQqd8cD4PfMHmM-5IMI8LOLb_pb4rIzIv16avUnqz6aLcKzCc6XqyAxo5uSb0N8GjTZI3TcZjW1RvixsD72lnutWnmFZeVp6BjoWmPG_D32NhMYDhW-jrQlK0pWwodatOh7xZ9n4JRoPnBT2uw49beiWTai6RSu6tPoKefQh0d4FZGuzit2F0qz6f60RMOHlYFzjaOHyfFLa1A";

async function convertImageToBase64(imagePath) {
  const imageBuffer = await fs.promises.readFile(imagePath);
  return imageBuffer.toString("base64");
}

async function callFaceEnrollmentAPI(base64Image) {
  const url = `${apiUrl}/faceenrollment?tenantid=${tenantId}`;
  const headers = { Authorization: authHeader };
  const requestBody = {
    MyPassId: "087acce9-c6c8-4a06-93ff-85eced4d19ff",
    Name: "Q-Pros",
    Surname: "Test",
    Email: "qprostesting0w3we@gmail.com",
    HEXPhoto: `data:image/jpeg;base64,${base64Image}`,
    Birthday: "1981-07-02",
    phoneNumber: "0505430075",
    consent: true,
    consentMyPass: null,
  };

  try {
    const response = await axios.put(url, requestBody, { headers });
    console.log(
      "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function callDeleteEnrollmentAPI() {
  const url = `${apiUrl}/faceenrollment/087acce9-c6c8-4a06-93ff-85eced4d19ff?tenantid=${tenantId}`;
  const headers = { Authorization: authHeader };

  try {
    await axios.delete(url, { headers });
  } catch (error) {
    console.error("Error while deleting enrollment:", error.message);
  }
}

async function splitAndSaveToExcel(base64Image, worksheet, rowIndex) {
  const chunks = base64Image.match(new RegExp(`.{1,${maxCellLength}}`, "g"));

  for (let i = 0; i < chunks.length; i++) {
    worksheet.getRow(rowIndex).getCell(i + 1).value = chunks[i];
  }
}

(async () => {
  // Create an Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Base64Images");

  for (let i = 1; i <= 2; i++) {
    const imagePath = `C:/Users/NashatAlzaatreh/projects/base64/Images/TestImage${i}.png`; // Replace with the actual image path
    const base64Image = await convertImageToBase64(imagePath);
    const isEnrollmentSuccessful = await callFaceEnrollmentAPI(base64Image);

    if (isEnrollmentSuccessful) {
      await callDeleteEnrollmentAPI();

      // Save base64Image in the Excel worksheet
      splitAndSaveToExcel(base64Image, worksheet, i);
    } else {
      console.log(`Enrollment failed for image${i}.png`);
      break; // Stop the loop and start a new one
    }
  }

  // Save the Excel file
  await workbook.xlsx.writeFile("output.xlsx");
})();
