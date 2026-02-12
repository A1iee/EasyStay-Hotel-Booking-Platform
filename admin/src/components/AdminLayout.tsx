import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  title: string;
  menuItems: any[];
  children: React.ReactNode;
}

export function AdminLayout({ title, menuItems, children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
        <div style={{ color: 'white', padding: '20px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
          易宿酒店后台
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>

      <Layout>
        <Header style={{ background: '#1890ff', color: 'white', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: 'white' }}>{title}</h2>
          <Button icon={<LogoutOutlined />} onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>
            登出
          </Button>
        </Header>

        <Content style={{ padding: '20px', background: '#f0f2f5' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
