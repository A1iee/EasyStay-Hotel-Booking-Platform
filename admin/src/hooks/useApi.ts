import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { API_BASE_URL } from '../config';

interface UseApiOptions {
  showMessage?: boolean;
}

export function useApi(options: UseApiOptions = { showMessage: true }) {
  const [loading, setLoading] = useState(false);

  const request = async (method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any, params?: any) => {
    try {
      setLoading(true);
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data,
        params,
      });

      if (response.data.code === 200) {
        if (options.showMessage && response.data.message) {
          message.success(response.data.message);
        }
        return response.data.data;
      } else {
        message.error(response.data.message || '请求失败');
        return null;
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || '请求失败';
      message.error(errorMsg);
      console.error('API Error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    get: (url: string, params?: any) => request('get', url, undefined, params),
    post: (url: string, data?: any, params?: any) => request('post', url, data, params),
    put: (url: string, data?: any, params?: any) => request('put', url, data, params),
    delete: (url: string, params?: any) => request('delete', url, undefined, params),
  };
}
