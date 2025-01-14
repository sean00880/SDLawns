import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  details: {
    vehicle_size: string;
    services: string;
    date: string;
    total: number;
    client_name: string;
    client_email: string;
    client_phone: string;
  };
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, details }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#4caf50",
            color: "#ffffff",
            padding: "15px 20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Hello {firstName},
        </div>
        <div style={{ padding: "20px" }}>
          <p style={{ fontSize: "16px", margin: "0 0 15px 0" }}>
            A new quote request has been submitted. Below are the details:
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <tbody>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Vehicle Size:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {details.vehicle_size}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Services:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {JSON.parse(details.services).join(", ")}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Date:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{details.date}</td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Total:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>${details.total}</td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Name:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {details.client_name}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Email:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {details.client_email}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                  Phone:
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {details.client_phone}
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: "16px", margin: "0" }}>
            Thank you for using our services!
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            padding: "15px 20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
          }}
        >
          This is an automated email. Please do not reply to this email.
        </div>
      </div>
    </div>
  );
};
