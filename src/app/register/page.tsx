'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { registerUser, validateEmail, getPasswordErrors } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'landowner' | 'equipment-owner'>('farmer');
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      setError('Please use a Gmail or Yahoo email address');
    } else {
      setError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(getPasswordErrors(newPassword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = registerUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    if (result.success) {
      toast({
        title: 'Account created successfully!',
        description: 'You can now log in with your credentials.',
      });
      router.push('/login');
    } else {
      setError(result.error || 'Registration failed');
    }
  };
  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input 
                  id="first-name" 
                  placeholder="Max" 
                  required 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="last-name" 
                  placeholder="Robinson" 
                  required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (Gmail or Yahoo only)</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="farmer">Farmer</SelectItem>
                        <SelectItem value="landowner">Landowner</SelectItem>
                        <SelectItem value="equipment-owner">Equipment Owner</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordErrors.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold">Password must contain:</p>
                  <ul className="list-disc list-inside">
                    <li className={password.length >= 8 ? 'text-green-600' : ''}>At least 8 characters</li>
                    <li className={/[a-zA-Z]/.test(password) ? 'text-green-600' : ''}>At least one letter</li>
                    <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>At least one number</li>
                    <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-600' : ''}>At least one symbol</li>
                  </ul>
                </div>
              )}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
