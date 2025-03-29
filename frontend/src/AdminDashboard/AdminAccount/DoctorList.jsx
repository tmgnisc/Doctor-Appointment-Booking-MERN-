import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  Tag,
  Spin,
  Alert,
  Button,
  Popconfirm,
  message,
  Card,
  Typography,
  Space,
} from "antd";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useContext(authContext);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/doctors/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setDoctors(response.data.data);
      } else {
        setError("Failed to fetch doctors");
      }
    } catch (err) {
      setError("Something went wrong while fetching doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleApprove = async (doctorId) => {
    setApprovingId(doctorId);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/doctors/approve/${doctorId}`,
        { isApproved: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Doctor approved successfully");
        fetchDoctors();
      } else {
        message.error("Failed to approve doctor");
      }
    } catch (err) {
      message.error("Error approving doctor");
    } finally {
      setApprovingId(null);
    }
  };

  const columns = [
    {
      title: "👨‍⚕️ Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "📧 Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || <i style={{ color: "#999" }}>N/A</i>,
    },
    {
      title: "🩺 Specialization",
      dataIndex: "specialization",
      key: "specialization",
      render: (text) => text || <i style={{ color: "#999" }}>N/A</i>,
    },
    {
      title: "✅ Status",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (status) => (
        <Tag
          icon={
            status === "approved" ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />
          }
          color={status === "approved" ? "green" : "orange"}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "⚙️ Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.isApproved === "pending" ? (
            <Popconfirm
              title="Are you sure to approve this doctor?"
              onConfirm={() => handleApprove(record._id)}
              okText="Approve"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                size="small"
                loading={approvingId === record._id}
              >
                Approve
              </Button>
            </Popconfirm>
          ) : (
            <Tag color="green">Approved</Tag>
          )}
          <Link to={`/admin/doctors/${record._id}`}>
            <Button size="small" icon={<EyeOutlined />}>
              View
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  if (loading)
    return (
      <div style={{ textAlign: "center", paddingTop: 60 }}>
        <Spin tip="Loading doctors..." size="large" />
      </div>
    );

  if (error)
    return (
      <div style={{ padding: 24 }}>
        <Alert type="error" message={error} showIcon />
      </div>
    );

  return (
    <div style={{ padding: 24 }}>
      <Card
        style={{
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          border: "1px solid #f0f0f0",
        }}
      >
        <Title level={3} style={{ marginBottom: 24 }}>
          🩺 Doctor Management
        </Title>

        <Table
          dataSource={doctors}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default DoctorList;
