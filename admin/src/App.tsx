import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import axios from 'axios';
import './App.css';

const { Title } = Typography;

function App() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username: values.username,
        password: values.password,
      });

      if (response.data.code === 200) {
        message.success('登录成功！');
        console.log('登录信息:', response.data.data);
        // TODO: 后面这里会跳转到首页、保存 token 等
      } else {
        message.error(response.data.message);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          易宿酒店后台管理登录
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'right' }}>
            还没有账号？<Link to="/register">去注册</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default App;
