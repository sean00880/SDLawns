import ServiceRequests from '../../components/admin/ServiceRequests';

export const dynamic = "force-dynamic";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ServiceRequests />
    </div>
  );
};

export default AdminPage;
