import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, RefreshCw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/bank-logo.png";
import hero from "@/assets/login-hero.jpg";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Central Bank Internet Banking" },
      { name: "description", content: "Login to your Central Bank Internet Banking account." },
    ],
  }),
  component: LoginPage,
});

function genCaptcha() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function LoginPage() {
  const [cif, setCif] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [captcha, setCaptcha] = useState(genCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cif.trim().length < 4) return toast.error("Please enter a valid CIF / User ID");
    if (password.length < 4) return toast.error("Please enter your password");
    if (captchaInput !== captcha) {
      setCaptcha(genCaptcha());
      setCaptchaInput("");
      return toast.error("Captcha does not match. Please try again.");
    }
    login();
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="gradient-account text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
          <div className="flex items-center gap-3 bg-white rounded-md px-3 py-1.5">
            <img src={logo} alt="Central Bank" width={40} height={40} />
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-primary">Central Bank</p>
              <p className="text-[9px] text-primary/80 tracking-wide">CENTRAL TO YOU SINCE 1911</p>
            </div>
          </div>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#" className="hover:opacity-80">Contact Us</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:opacity-80">Calculator</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:opacity-80">Help</a>
            <span className="opacity-40">|</span>
            <a href="#" className="hover:opacity-80">More</a>
          </nav>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-28 bg-white text-foreground"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="mr">मराठी</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Hero */}
      <section className="relative gradient-account text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Welcome to<br />Online Banking!</h1>
            <p className="mt-5 max-w-lg text-base opacity-90">
              Explore our One Stop Banking Solution – your secure, user-friendly gateway to effortless banking, anytime, anywhere, and experience the seamless journey.
            </p>
            <img src={hero} alt="" width={520} height={400} className="mt-8 max-w-md self-start rounded-xl opacity-95" />
          </div>

          {/* Login card */}
          <div className="md:pl-8">
            <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-7 text-foreground shadow-2xl">
              <h2 className="text-center text-xl font-semibold">Login to Personal Banking</h2>
              

              <div className="mt-6 space-y-1.5">
                <Label htmlFor="cif">CIF / User ID <span className="text-destructive">*</span></Label>
                <Input id="cif" placeholder="Please type here..." value={cif} onChange={(e) => setCif(e.target.value)} className="h-11" />
              </div>

              <div className="mt-4 space-y-1.5">
                <Label htmlFor="pwd">Password <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Input id="pwd" type={showPwd ? "text" : "password"} placeholder="Please type here..." value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 pr-10" />
                  <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[auto_1fr] gap-3">
                <div>
                  <Label>Captcha</Label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex h-11 items-center rounded-md border bg-muted px-3 font-mono text-lg font-bold tracking-widest line-through decoration-muted-foreground/50">
                      {captcha}
                    </div>
                    <button type="button" aria-label="Play captcha" className="grid h-9 w-9 place-items-center rounded-full text-primary hover:bg-accent"><Volume2 className="h-4 w-4" /></button>
                    <button type="button" aria-label="Refresh captcha" onClick={() => setCaptcha(genCaptcha())} className="grid h-9 w-9 place-items-center rounded-full text-primary hover:bg-accent"><RefreshCw className="h-4 w-4" /></button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cap">Enter Captcha</Label>
                  <Input id="cap" placeholder="Please type here..." value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="mt-1.5 h-11" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <a href="#" className="text-sm font-semibold text-primary hover:underline">Trouble Logging In ?</a>
                <Button type="submit" className="h-11 rounded-full px-10 text-base">Login</Button>
              </div>

              <div className="relative my-6 text-center text-xs text-muted-foreground">
                <span className="relative z-10 bg-card px-3">OR</span>
                <span className="absolute left-0 top-1/2 -z-0 h-px w-full bg-border" />
              </div>

              <Button type="button" variant="outline" className="h-11 w-full rounded-full border-primary text-primary hover:bg-primary/5">
                Cent eeZ Registration
              </Button>
            </form>

            <div className="mt-8 rounded-xl bg-white/5 p-5 backdrop-blur">
              <h3 className="font-semibold">Security Tips to avoid Phishing Attacks</h3>
              <p className="mt-2 text-sm opacity-90">Always visit our Internet Banking Site directly through the website or through the link provided in our official website Central Bank Of India.</p>
              <p className="mt-2 text-sm opacity-90">Keep your user id and password information safe and secure.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-4 text-sm">
            <Link to="/" className="hover:underline">Privacy Policy</Link>
            <span className="opacity-40">|</span>
            <Link to="/" className="hover:underline">Terms & Conditions</Link>
            <span className="opacity-40">|</span>
            <Link to="/" className="hover:underline">Disclaimer</Link>
            <p className="ml-auto text-xs opacity-75">© {new Date().getFullYear()} Central Bank. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </div>
  );
}
