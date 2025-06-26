"use client";

import { useEffect, useState } from "react";
import { Settings, LogOut, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=6d28d9&color=fff";

export default function Sidebar({
  soundEnabled,
  setSoundEnabled,
  showErrors,
  setShowErrors,
  showSettings,
  setShowSettings,
  open,
  setOpen,
}: {
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  showErrors: boolean;
  setShowErrors: (v: boolean) => void;
  showSettings: boolean;
  setShowSettings: (v: boolean) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );
  const [fullScreen, setFullScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-800 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
        type="button"
      >
        <Menu className="h-6 w-6 text-purple-700 dark:text-purple-300" />
      </button>
      <aside
        className={`fixed left-0 top-0 h-full ${
          open ? "w-72 z-40" : "w-0 z-40"
        } bg-white dark:bg-gray-900 shadow-lg flex flex-col transition-all duration-300 overflow-hidden`}
        style={{ transitionProperty: "width, z-index" }}
      >
        <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <div style={{ width: "2.5rem" }} />
          <span className="text-xl font-bold text-purple-700 dark:text-purple-300 ml-2">
            Profile
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center space-y-2 p-6 overflow-y-auto">
          <img
            src={DEFAULT_AVATAR}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-purple-400 mb-2"
          />
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {user?.name || "Guest"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email || "Not logged in"}
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 mt-4"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Test Settings</DialogTitle>
              <DialogDescription>
                Customize your typing test experience
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound" className="flex items-center space-x-2">
                  <span>Sound Effects</span>
                </Label>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="errors" className="flex items-center space-x-2">
                  <span>Show Errors</span>
                </Label>
                <Switch
                  id="errors"
                  checked={showErrors}
                  onCheckedChange={setShowErrors}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </aside>
    </>
  );
}
