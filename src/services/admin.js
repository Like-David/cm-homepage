import axios from './axios';

/**
 * 재직증명서 목록 조회
 * @param {Object} params - { page, limit, search, sortBy, sortOrder }
 * @returns {Promise<Object>} - { data, pagination }
 */
export const getCertificates = async (params = {}) => {
    const response = await axios.get('/admin/certificates', { params });
    return response.data;
};

/**
 * 재직증명서 상세 조회
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const getCertificate = async (id) => {
    const response = await axios.get(`/admin/certificates/${id}`);
    return response.data.data;
};

/**
 * 재직증명서 생성
 * @param {Object} certificateData
 * @returns {Promise<Object>}
 */
export const createCertificate = async (certificateData) => {
    const response = await axios.post('/admin/certificates', certificateData);
    return response.data;
};

/**
 * 재직증명서 수정
 * @param {number} id
 * @param {Object} certificateData
 * @returns {Promise<Object>}
 */
export const updateCertificate = async (id, certificateData) => {
    const response = await axios.put(`/admin/certificates/${id}`, certificateData);
    return response.data;
};

/**
 * 재직증명서 삭제
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const deleteCertificate = async (id) => {
    const response = await axios.delete(`/admin/certificates/${id}`);
    return response.data;
};
