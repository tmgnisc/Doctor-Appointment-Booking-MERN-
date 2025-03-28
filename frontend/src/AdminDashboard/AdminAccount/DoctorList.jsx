import React, { useEffect, useState, useContext } from "react";
import { Table, Tag, Spin, Alert, Button, Popconfirm, message } from "antd";
import axios from "axios";
import { authContext } from "../../context/AuthContext"; 
import { Link } from "react-router-dom";
import { Space } from "antd";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useContext(authContext); // ✅ Get token from context

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      render: (text) => text || "N/A",
    },
    {
      title: "Approval Status",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (status) => (
        <Tag color={status === "approved" ? "green" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.isApproved === "pending" ? (
            <Popconfirm
              title="Approve this doctor?"
              onConfirm={() => handleApprove(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" size="small">
                Approve
              </Button>
            </Popconfirm>
          ) : (
            <Tag color="green">Approved</Tag>
          )}
          <Link to={`/admin/doctors/${record._id}`}>
            <Button size="small">View</Button>
          </Link>
        </Space>
      ),
    },
  ];

  if (loading) return <Spin tip="Loading doctors..." />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div>
      <h2>Doctor List</h2>
      <Table
        dataSource={doctors}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default DoctorList;
