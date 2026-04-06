import useAuth from '@/auth/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { deleteUserById } from '@/services/AuthService';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const UserProfile = () => {

    const [isEditing, setEditing] = useState(false);
    const user= useAuth((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleDeleteAccount = async () => {
        if(!user?.id) return;

        if(!window.confirm("Are you sure")) return;

        try {
          setLoading(true);

          await deleteUserById(user?.id);
          useAuth.getState().logout();
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate("/login");
          toast.success("Your account have been deleted successfully.");
        } catch (error) {
          console.error(error)
        }finally{
          setLoading(false);
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword ] = useState("");
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("new pass:- ", password);
      setPassword("");
      setIsOpen(false);
    }


  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center"
      >
        User Profile
      </motion.h1>

      {/* Profile Card */}
      <Card className="rounded-2xl shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28 border shadow-md">
              <AvatarImage src="https://api.dicebear.com/7.x/thumbs/svg?seed=user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="rounded-xl px-5">
              Change Picture
            </Button>
          </div>

          {/* User Details */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={user?.name}
                  readOnly
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email}
                  readOnly
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  value={user?.provider}
                  readOnly
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enabled">Enabled</Label>
                <Input
                  id="enabled"
                  value={
                    user?.enable
                    ? "Yes" 
                    : "No"
                  }
                  readOnly
                  className="rounded-xl"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={user?.name}
                  // onChange={(e) => {}}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email}
                  readOnly
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  value={user?.provider}
                  readOnly
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enabled">Enabled</Label>
                <Input
                  id="enabled"
                  value={
                    user?.enable
                    ? "Yes" 
                    : "No"
                  }
                  readOnly
                  className="rounded-xl"
                />
              </div>
            </div>
          )}

          {!isEditing ? (
            <Button
              className="w-full rounded-2xl mt-4 text-lg"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3 mt-4">
              <Button
                className="rounded-2xl w-full"
              >
                Cancel
              </Button>
              <Button
                className="rounded-2xl w-full"
                onClick={() => {
                  /* save handler */
                }}
              >
                Save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Section */}
      <Card className="rounded-2xl shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-xl">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full rounded-xl py-3 text-base"
            onClick={handleToggle}
          >
            Change Password
          </Button>
          {isOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center  z-50 backdrop-blur-sm"
              onClick={handleToggle} // click outside closes
            >
              <div
                className="bg-black bg-gradient-to-br border-gray-400 rounded-2xl p-8 w-96 shadow-neon animate-slideUp"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-shadow-white-400 mb-6 text-center tracking-wide">
                  Change Password
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/20 border border-gray-400 rounded-lg p-3 text-white placeholder-white-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
                    required
                  />
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="destructive"
                      className="hover:scale-105"
                      onClick={handleToggle}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-white text-black hover:scale-105 hover:bg-white-500 transition"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <Button
            variant="destructive"
            className="w-full rounded-xl py-3 text-base"
            disabled={loading}
            onClick={handleDeleteAccount}
          >
            {
              loading 
              ? "Deleting..."
              : "Delete Account"
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile