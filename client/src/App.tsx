import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "next-themes";
import { useLessonStore } from "@/hooks/use-lesson-store";
import NotFound from "@/pages/not-found";
import HomeMobile from "@/pages/HomeMobile";
import Lessons from "@/pages/Lessons";
import LessonDetail from "@/pages/LessonDetail";
import Ranch from "@/pages/Ranch";
import Playground from "@/pages/Playground";
import CypherpunksEthos from "@/pages/CypherpunksEthos";
import CypherpunkModule1 from "@/pages/CypherpunkModule1";
import CypherpunkModule2 from "@/pages/CypherpunkModule2";
import CypherpunkModule3 from "@/pages/CypherpunkModule3";
import CypherpunkModule4 from "@/pages/CypherpunkModule4";
import MindmapPage from "@/pages/MindmapPage";
import ProfilePage from "@/pages/ProfilePage";
import { WalletTest } from "@/pages/WalletTest";
import LessonTest from "@/pages/LessonTest";


function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeMobile} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/lessons/:id" component={LessonDetail} />
      <Route path="/ranch" component={Ranch} />
      <Route path="/playground" component={Playground} />
      <Route path="/cypherpunks-ethos" component={CypherpunksEthos} />
      <Route path="/mindmap" component={MindmapPage} />
      <Route path="/cypherpunk-module-1" component={CypherpunkModule1} />
      <Route path="/cypherpunk-module-2" component={CypherpunkModule2} />
      <Route path="/cypherpunk-module-3" component={CypherpunkModule3} />
      <Route path="/cypherpunk-module-4" component={CypherpunkModule4} />
      <Route path="/profile/:publicKey?" component={ProfilePage} />
      <Route path="/wallet-test" component={WalletTest} />
      <Route path="/lesson-test" component={LessonTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { clearInvalidSolanaProgress } = useLessonStore();

  // Clear invalid Solana lesson progress on app startup
  useEffect(() => {
    clearInvalidSolanaProgress();
  }, []);

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
