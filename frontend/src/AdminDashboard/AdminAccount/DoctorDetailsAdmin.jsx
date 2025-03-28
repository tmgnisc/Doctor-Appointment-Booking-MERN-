import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Card, Spin, Alert, Tag } from "antd";
import axios from "axios";
import { authContext } from "../../context/AuthContext";

const DoctorDetailsAdmin = () => {
  const { id } = useParams();
  const { token } = useContext(authContext);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctor = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        setError("Failed to load doctor details.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  if (loading) return <Spin tip="Loading doctor details..." />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div>
      <Card
        title={doctor.name}
        extra={<Tag color={doctor.isApproved === "approved" ? "green" : "orange"}>{doctor.isApproved}</Tag>}
        style={{ marginBottom: 24 }}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email">{doctor.email || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Phone">{doctor.phone || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Specialization">{doctor.specialization || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Ticket Price">Rs. {doctor.ticketPrice || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Average Rating">{doctor.averageRating}</Descriptions.Item>
          <Descriptions.Item label="Total Reviews">{doctor.reviews?.length}</Descriptions.Item>
          <Descriptions.Item label="Bio">{doctor.bio || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="About">{doctor.about || "N/A"}</Descriptions.Item>
        </Descriptions>
      </Card>

      {doctor.qualifications?.length > 0 && (
        <Card title="Education" style={{ marginBottom: 24 }}>
          {doctor.qualifications.map((q, index) => (
            <Descriptions key={index} size="small" column={1} bordered style={{ marginBottom: 12 }}>
              <Descriptions.Item label="Degree">{q.degree}</Descriptions.Item>
              <Descriptions.Item label="University">{q.university}</Descriptions.Item>
              <Descriptions.Item label="From-To">
                {q.startingDate} → {q.endingDate}
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Card>
      )}

      {doctor.experiences?.length > 0 && (
        <Card title="Experience" style={{ marginBottom: 24 }}>
          {doctor.experiences.map((exp, index) => (
            <Descriptions key={index} size="small" column={1} bordered style={{ marginBottom: 12 }}>
              <Descriptions.Item label="Position">{exp.position}</Descriptions.Item>
              <Descriptions.Item label="Hospital">{exp.hospital}</Descriptions.Item>
              <Descriptions.Item label="From-To">
                {exp.startingDate} → {exp.endingDate}
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Card>
      )}

      {doctor.timeSlots?.length > 0 && (
        <Card title="Available Time Slots">
          {doctor.timeSlots.map((slot, index) => (
            <Descriptions key={index} size="small" column={1} bordered style={{ marginBottom: 12 }}>
              <Descriptions.Item label="Day">{slot.day}</Descriptions.Item>
              <Descriptions.Item label="From-To">
                {slot.startingTime} → {slot.endingTime}
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Card>
      )}
    </div>
  );
};

export default DoctorDetailsAdmin;
