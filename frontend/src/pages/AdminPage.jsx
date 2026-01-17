import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useAdminStore } from "../store/useAdminStore";
import { Loader2, SunMoon, Trash, X } from "lucide-react";
import ThemeController from "../components/ThemeController";

const AdminPage = () => {
  const { logout, authUser } = useAuthStore();
  const { getAllLeads, leads, deleteLead, isGettingAllLeads, updateLead } =
    useAdminStore();
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (authUser) {
      getAllLeads();
    }
  }, [authUser]);

  async function handleDelete(leadId) {
    setIsDeleting(true);

    await deleteLead(leadId);
    setDeletingId(null);
    setIsDeleting(false);
  }

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <header className="sticky top-0 z-10 bg-base-100 border-b border-base-300 px-6 py-4 flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-base-content">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-base-content/70">
            Hi, {authUser?.name}
          </span>

          {/* Theme Toggle */}
          <div className="tooltip tooltip-bottom" data-tip="Toggle theme">
            <ThemeController />
          </div>

          <button onClick={logout} className="btn btn-error btn-sm">
            Logout
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="mb-6">
        <button
          onClick={getAllLeads}
          disabled={isGettingAllLeads}
          className="btn btn-primary btn-sm"
        >
          {isGettingAllLeads && <Loader2 size={14} className="animate-spin" />}
          Refresh
        </button>
      </div>

      {/* Leads Table */}
      <div className="hidden sm:block bg-base-200 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads?.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.city}</td>

                  <td className="flex gap-2 items-center">
                    <select
                      className="select select-bordered w-15 md:w-32"
                      value={lead.status}
                      onChange={(e) => updateLead(lead._id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="contacted">contacted</option>
                      <option value="converted">converted</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        setDeletingId(lead._id);
                      }}
                    >
                      <Trash size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-base-content/60">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden space-y-4">
  {leads?.length > 0 ? (
    leads.map((lead) => (
      <div
        key={lead._id}
        className="bg-base-200 rounded-xl p-4 shadow-md space-y-3"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base">{lead.name}</h3>

          <button
            className="btn btn-error btn-xs btn-outline"
            onClick={() => setDeletingId(lead._id)}
          >
            <Trash size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="text-sm space-y-1 text-base-content/80">
          <p>
            <span className="font-medium">Email:</span> {lead.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {lead.phone}
          </p>
          <p>
            <span className="font-medium">City:</span> {lead.city}
          </p>
        </div>

        {/* Divider */}
        <div className="divider my-1" />

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Lead Status</span>

          <select
            className="select select-bordered select-sm w-36"
            value={lead.status}
            onChange={(e) => updateLead(lead._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-base-content/60">No leads found</p>
  )}
</div>


      {deletingId && (
        <dialog className="modal modal-open ">
          <div
            className="modal-backdrop backdrop-blur-sm bg-black/40"
            onClick={() => setDeletingId(null)}
          />

          <div className="modal-box max-w-md bg-base-200 relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setDeletingId(null)}
            >
              <X />
            </button>

            <h3 className="font-semibold text-lg">Confirm Delete</h3>
            <p className="mt-2 text-sm text-base-content/70">
              Are you sure you want to delete this lead? This action cannot be
              undone.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-error btn-sm"
                disabled={isDeleting}
                onClick={() => handleDelete(deletingId)}
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Yes, Delete"
                )}
              </button>
              <button
                className="btn btn-sm"
                onClick={() => setDeletingId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminPage;
