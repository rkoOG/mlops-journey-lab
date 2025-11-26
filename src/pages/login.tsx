import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Get the valid token from environment variables
  const VALID_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate the access token
    if (accessToken === VALID_TOKEN) {
      login();
      navigate("/");
    } else {
      setError("Invalid access token. Please check your token and try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the MLOps Journey Lab
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                type="password"
                placeholder="Enter your access token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                required
                disabled={isLoading}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter the secure access token provided by your team
                administrator
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </Button>

            <div className="text-xs text-center text-muted-foreground mt-4 p-3 bg-muted/50 rounded-md">
              <p className="font-medium mb-1">🔒 Secure Access</p>
              <p>
                This application uses token-based authentication to protect
                access.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
