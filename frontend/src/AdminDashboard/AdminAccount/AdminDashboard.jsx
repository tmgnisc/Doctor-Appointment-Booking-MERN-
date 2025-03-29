import { Layout, Menu, theme, Button } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />

        <div style={{ fontSize: 16, fontWeight: 500 }}>Hello, Admin 👋</div>
      </Header>

      <Layout>
        <Sider
          width={220}
          style={{
            background: "#fff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                flexGrow: 1,
                borderRight: 0,
              }}
              theme="light"
              items={[
                {
                  key: "1",
                  icon: <DashboardOutlined />,
                  label: <Link to="/admin">Dashboard</Link>,
                },
                {
                  key: "2",
                  icon: <UserOutlined />,
                  label: <Link to="/admin/doctors">Doctors</Link>,
                },
              ]}
            />

            {/* 🚀 Logout Button at Bottom */}
            <div style={{ padding: "16px" }}>
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                danger
                block
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
