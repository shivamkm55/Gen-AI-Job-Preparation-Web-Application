import { getAllInterviewReports, generateInterviewReport, getInterviewReportID} from "../services/interview.api"; 
import { useCallback, useContext } from "react";
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
            const data = await generateInterviewReport({jobDescription, selfDescription, resume: resumeFile});
            setReport(data.data);
            return data.data;
        } catch (error) {
            console.error("Error generating interview report:", error);
            throw new Error(error.response?.data?.message || "Unable to generate interview report", { cause: error });
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (reportId) => {
        setLoading(true);
        try {
            const data = await getInterviewReportID(reportId);
            setReport(data.data);
        } catch (error) {
            console.error("Error fetching interview report:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAllReports = useCallback(async () => {
        setLoading(true);   
        try{
            const response  = await getAllInterviewReports();
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
            throw new Error(error.response?.data?.message || "Unable to load interview reports", { cause: error });
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReports]);

    return { loading, setLoading, report, setReport, reports, setReports, generateReport, getReportById, getAllReports };
};
