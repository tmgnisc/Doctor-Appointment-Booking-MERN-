import { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Statistic, Typography, message } from "antd";
import {
  UserOutlined,
  MedicineBoxOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { authContext } from "../../context/AuthContext"; 

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Title: AntTitle } = Typography;

const AdminHome = () => {
  const { token } = useContext(authContext); 
  const [doctorStats, setDoctorStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchDoctorStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/doctors/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const doctors = res.data.data;
        const approved = doctors.filter((doc) => doc.isApproved === "approved").length;
        const pending = doctors.length - approved;

        setDoctorStats({
          total: doctors.length,
          approved,
          pending,
        });
      } catch (err) {
        console.error("Failed to fetch doctor data", err);
        message.error("Could not load doctor stats");
      }
    };

    if (token) {
      fetchDoctorStats();
    }
  }, [token]);

  const chartData = {
    labels: ["Doctors"],
    datasets: [
      {
        label: "Total",
        data: [doctorStats.total],
        backgroundColor: "#1890ff",
      },
      {
        label: "Approved",
        data: [doctorStats.approved],
        backgroundColor: "#52c41a",
      },
      {
        label: "Pending",
        data: [doctorStats.pending],
        backgroundColor: "#faad14",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, 
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Doctor Approval Status",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ padding: "24px" }}>
      <AntTitle level={2} style={{ marginBottom: 24 }}>
        👋 Welcome Back, Admin!
      </AntTitle>

      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card
            hoverable
            style={{ backgroundColor: "#f0f5ff", border: "1px solid #91d5ff" }}
          >
            <Statistic
              title="Total Doctors"
              value={doctorStats.total}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            style={{ backgroundColor: "#f6ffed", border: "1px solid #b7eb8f" }}
          >
            <Statistic
              title="Approved Doctors"
              value={doctorStats.approved}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            style={{ backgroundColor: "#fffbe6", border: "1px solid #ffe58f" }}
          >
            <Statistic
              title="Pending Approvals"
              value={doctorStats.pending}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 48 }}>
        <Card>
          <div style={{ height: 280 }}> {/* ✅ smaller chart height */}
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
