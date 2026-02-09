import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Radio, message } from 'antd';
import axios from 'axios';
import './App.css';

const { Title } = Typography;

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username: values.username,
        password: values.password,
        role: values.role,
      });

      if (response.data.code === 200) {
        message.success('注册成功！');
        console.log('注册信息:', response.data.data);
        // TODO: 后面这里会跳转到登录页
      } else {
        message.error(response.data.message);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          易宿酒店后台注册
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

          <Form.Item
            label="角色"
            name="role"
            initialValue="merchant"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Radio.Group>
              <Radio value="merchant">商户</Radio>
              <Radio value="admin">管理员</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'right' }}>
            已有账号？<Link to="/login">去登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
