import { getAllInterviewReports, generateInterviewReport, getInterviewReportID} from "../services/interview.api"; 
import { useState } from "react";
import { InterviewContext} from "../interview.context";


export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {loading,setLoading,report,setReport,reports,setReports} = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true);
        try {
            const data = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(data.interviewReport);
            return data;
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (reportId) => {
        setLoading(true);
        try {
            const data = await getInterviewReportID(reportId);
            setReport(data);
        } catch (error) {
            console.error("Error fetching interview report:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAllReports = async () => {
        setLoading(true);   
        try{
            const response  = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, setLoading, report, setReport, reports, setReports, generateReport, getReportById, getAllReports };
};
