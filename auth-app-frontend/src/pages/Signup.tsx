import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Lock, User, CheckCircle2Icon, } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import React, { useState } from "react"; 
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthService";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import OAuth2Buttons from "@/components/OAuth2Buttons";



const Signup = () => {

  const [data,setData]=useState<RegisterData>({
    name: "",
    email: "",
    password: ""
  });

  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  
  //handling form change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(data)
    setData((value)=> ({
      ...value,
      [event.target.name]: event.target.value
    }));
  }

  const handleFormSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(data)

      if(data.name.trim() === ''){
        toast.error("Name is Required");
        return;
      }

      if(data.email.trim() === ''){
        toast.error("Email is Required");
        return;
      }

      if(data.password.trim() === ''){
        toast.error("Password is Required");
        return;
      }

      // form submit for registrations
      try {
        setLoading(true);
        const result = await registerUser(data);
        console.log(result)
        toast.success("User Register SuccessFully...");
        setData({
          name: "",
          email: "",
          password: ""
        });

        // naviagate to login page
        navigate("/login");
        
      } catch (error) {
        setError(error);
      }finally{
        setLoading(false);
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl rounded-2xl p-6">
          <CardContent>
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-center"
            >
              Create Your Account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-muted-foreground mt-2"
            >
              Join the next-generation authentication platform
            </motion.p>

            {/* error section  */}
            {
              error && (
                <div className="mt-6">
                  <Alert variant={"destructive"}>
                    <CheckCircle2Icon />
                    <AlertTitle>{error?.reponse ? (
                      error?.response?.data?.message
                    ) : (
                      error?.message
                    )}</AlertTitle>
                  </Alert>
                </div>
              )
            }

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
              {/* name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="name"
                    placeholder="Enter Your Name"
                    className="pl-10"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button disabled={loading} className="w-full cursor-pointer rounded-2xl text-lg">
                {loading ? (
                  <><Spinner /> Please wait...</>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-[1px] bg-border"></div>
                <span className="text-muted-foreground text-sm">OR</span>
                <div className="flex-1 h-[1px] bg-border"></div>
              </div>

              {/* OAuth Buttons */}
              <OAuth2Buttons />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Signup