import { Layout, Menu, theme, Button } from "antd";
import { UserOutlined, DashboardOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
        style={{ display: "flex", alignItems: "center", padding: "0 16px" }}
      >
        <div className="demo-logo" />
        <h1 style={{ color: "white", margin: 0 }}>Admin Dashboard</h1>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ flexGrow: 1, borderRight: 0 }}
            >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/admin">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/admin/doctors">Doctors</Link>
              </Menu.Item>
            </Menu>

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
