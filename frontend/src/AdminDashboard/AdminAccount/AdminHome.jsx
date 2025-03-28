import { Card, Row, Col, Statistic } from "antd"
import { UserOutlined, MedicineBoxOutlined } from "@ant-design/icons"

const AdminHome = () => {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Doctors" value={3} prefix={<MedicineBoxOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Approved Doctors" value={2} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Approvals" value={1} prefix={<UserOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminHome

