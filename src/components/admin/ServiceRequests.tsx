"use client";
import { useState, useEffect } from "react";
import { useSupabase } from "../../context/SupabaseContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ServiceRequest {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  service: string | null;
  vehicle_type: string;
  date: string;
  time: string;
  status: string;
  services: any[];
}

const ServiceRequests = () => {
  const { supabase } = useSupabase();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  /**
   * Store a single Date or null in state (assuming single-day selection).
   */
  const [rescheduleDate, setRescheduleDate] = useState<Date | null>(null);
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("service_requests")
          .select("*");
        if (error) throw error;

        setServiceRequests(data as ServiceRequest[]);
      } catch (fetchError: any) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, [supabase]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await supabase
        .from("service_requests")
        .update({ status: newStatus })
        .eq("id", id);

      // Re-fetch to update the table
      const { data, error } = await supabase.from("service_requests").select("*");
      if (error) throw error;

      setServiceRequests(data as ServiceRequest[]);
      setSelectedRequestId(null);
      setIsRescheduleModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReschedule = async () => {
    if (!selectedRequestId || !rescheduleDate || !rescheduleTime) return;

    try {
      await supabase
        .from("service_requests")
        .update({
          status: "rescheduled",
          date: rescheduleDate.toISOString().slice(0, 10),
          time: rescheduleTime,
        })
        .eq("id", selectedRequestId);

      const { data, error } = await supabase.from("service_requests").select("*");
      if (error) throw error;

      setServiceRequests(data as ServiceRequest[]);
      setSelectedRequestId(null);
      setIsRescheduleModalOpen(false);
      setRescheduleDate(null);
      setRescheduleTime("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  /**
   * "Duck-typing" the event rather than matching react-calendar’s exact signature.
   * We'll just assume `value` might be a Date or an array of Dates.
   */
  const handleCalendarChange = (value: any) => {
    if (Array.isArray(value)) {
      setRescheduleDate(value[0] ?? null);
    } else {
      setRescheduleDate(value instanceof Date ? value : null);
    }
  };

  return (
    <div className="service-requests">
      <h2>Service Requests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Vehicle Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.customer_name}</td>
                <td>{request.customer_email}</td>
                <td>{request.customer_phone}</td>
                <td>{request.service}</td>
                <td>{request.vehicle_type}</td>
                <td>{request.date}</td>
                <td>{request.time}</td>
                <td>{request.status}</td>
                <td>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(request.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedRequestId(request.id);
                        setIsRescheduleModalOpen(true);
                      }}
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(request.id, "rejected")}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(request.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isRescheduleModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/*
              By casting to `any` (or ignoring via @ts-ignore),
              we won’t get TS errors about LooseValue vs. null, etc.
            */}
            <Calendar
              selectRange={false}
              onChange={handleCalendarChange as any}
              value={rescheduleDate || undefined /* cast to any if needed */}
            />
            <Label htmlFor="rescheduleTime">Reschedule Time:</Label>
            <Input
              type="time"
              id="rescheduleTime"
              value={rescheduleTime}
              onChange={(e) => setRescheduleTime(e.target.value)}
            />
            <Button onClick={handleReschedule}>Reschedule</Button>
            <Button variant="ghost" onClick={() => setIsRescheduleModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequests;
