import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Lessons from "@/pages/Lessons";
import LessonDetail from "@/pages/LessonDetail";
import Ranch from "@/pages/Ranch";
import Playground from "@/pages/Playground";
import CypherpunksEthos from "@/pages/CypherpunksEthos";
import CypherpunkModule1 from "@/pages/CypherpunkModule1";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/lessons/:id" component={LessonDetail} />
      <Route path="/ranch" component={Ranch} />
      <Route path="/playground" component={Playground} />
      <Route path="/cypherpunks-ethos" component={CypherpunksEthos} />
      <Route path="/cypherpunk-module-1" component={CypherpunkModule1} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <WalletProvider>
            <MainLayout>
              <Toaster />
              <Router />
            </MainLayout>
          </WalletProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
