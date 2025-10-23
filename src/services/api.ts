import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/constants';

export interface LoanApplicationResponse {
  id: number;
  title: string;
  [key: string]: unknown;
}

export const getWorkplaceCategories = async (): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>(
    API_ENDPOINTS.WORKPLACE_CATEGORIES
  );
  return response.data;
};

export const submitLoanApplication = async (
  firstName: string,
  lastName: string
): Promise<LoanApplicationResponse> => {
  const response = await axiosInstance.post<LoanApplicationResponse>(
    API_ENDPOINTS.SUBMIT_APPLICATION,
    {
      title: `${firstName} ${lastName}`,
    }
  );
  return response.data;
};
