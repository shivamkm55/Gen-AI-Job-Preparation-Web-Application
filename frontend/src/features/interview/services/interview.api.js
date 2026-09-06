import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/interview',
  withCredentials: true, // Include cookies in requests
});


/**
 * @description service function to generate interview report based on job description, self description and resume file
 */
export const generateInterviewReport = async ({jobDescription, selfDescription, resume}) => {

  const formData = new FormData(); // if you want to send files, from the frontend to the backend, you need to use FormData
  formData.append('jobDescription', jobDescription);
  formData.append('selfDescription', selfDescription);
  formData.append('resume', resumeFile); // Assuming resumeFile is a File object

  const response = await api.post("/api/interview",formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
} 
/**
 * @description service function to get interview report based on reportId
 */
export const getInterviewReportID = async (reportId) => {
  const response = await api.get(`/api/interview/report/${reportId}`)
  return response.data;
}
/**
  * @description service function to get all interview reports
 */
export const getAllInterviewReports = async () => {
  const response = await api.get(`/api/interview/`)
  return response.data;
} 