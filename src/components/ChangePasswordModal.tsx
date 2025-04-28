import { useState } from "react";
import { Button } from "./ui-elements/button";
import {toast} from "react-toastify"
import apiClient from "@/lib/axios";
import Cookies from "js-cookie";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }
    if (currentPassword === newPassword) {
      toast.error("New password cannot be the same as the current password");
      return;
    }
    if (currentPassword === "") {
      toast.error("Current password is required");
      return;
    }
    if (newPassword === "") {
      toast.error("New password is required");
      return;
    }
    if (confirmPassword === "") {
      toast.error("Confirm password is required");
      return;
    }
    const userID = Cookies.get("user_id");
    const payload = {
      currentPassword,
      newPassword,
      confirmPassword,
      userID
    }
    try {
      await apiClient.post("/api/auth/changePassword", payload).then((res) => {
        if (res.data === 200) {
          toast.success("Password changed successfully");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          onClose();
        }
        else if (res.data === 404) {
          toast.error("Current password is incorrect");
        }
        else if (res.data === 400) {
          toast.error("New password cannot be the same as the current password");
        }
      }).catch((err) => {
        toast.error(err.response.data.message);
      } );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-[1101] w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Change Password
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Please enter your current password and new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              label="Cancel"
              variant="outlinePrimary"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                onClose();
              }}
            />
            <Button
              label="Change Password"
              variant="primary"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
} 