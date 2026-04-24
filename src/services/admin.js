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

// ===== 통계 =====

/**
 * 서비스 통계 조회
 */
export const getStatistics = async () => {
    const response = await axios.get('/admin/statistics');
    return response.data;
};

// ===== 사용자 관리 =====

/**
 * 사용자 목록 조회
 * @param {Object} params - { search, role }
 */
export const getUsers = async (params = {}) => {
    const response = await axios.get('/admin/users', { params });
    return response.data;
};

/**
 * 사용자 역할 변경
 * @param {number} id
 * @param {string} role
 */
export const updateUserRole = async (id, role) => {
    const response = await axios.patch(`/admin/users/${id}/role`, { role });
    return response.data;
};

/**
 * 사용자 삭제
 * @param {number} id
 */
export const deleteUser = async (id) => {
    const response = await axios.delete(`/admin/users/${id}`);
    return response.data;
};

/**
 * 내 발급 이력 조회 (이름 기준 필터)
 * @param {string} employeeName
 */
export const getMyCertificates = async (employeeName) => {
    const response = await axios.get('/admin/certificates', {
        params: { search: employeeName, limit: 10 },
    });
    return response.data;
};
