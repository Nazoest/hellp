import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
<main className="flex h-full flex-col items-center bg-sky-500 justify-center">
  <div className="space-y-5 text-center">
    <h1 className="text-6xl font-semibold drop-shadow-md text-white">Auth</h1>
    <p className="text-white text-large">A simple authentication service</p>
    <div>
      <LoginButton>
        <Button variant="secondary" size="lg">Sign in</Button>
      </LoginButton>
      </div>
  </div>
</main>  );
}
