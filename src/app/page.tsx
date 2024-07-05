'use client'

import { useEffect, useState } from 'react'

import { redirect } from 'next/navigation';
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return redirect('/ai')
  // if (!mounted) return null;

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
  //     <h1 className="text-3xl font-bold mb-8">The current theme is: {theme}</h1>
  //     <div className="space-x-4 mb-8">
  //       <button onClick={() => setTheme('light')} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Light Mode</button>
  //       <button onClick={() => setTheme('dark')} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">Dark Mode</button>
  //     </div>
  //     <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
  //       <div className="p-4 bg-primary text-primary-foreground rounded-md">
  //         Primary Background
  //       </div>
  //       <div className="p-4 bg-secondary text-secondary-foreground rounded-md">
  //         Secondary Background
  //       </div>
  //       <div className="p-4 bg-accent text-accent-foreground rounded-md">
  //         Accent Background
  //       </div>
  //       <div className="p-4 bg-muted text-muted-foreground rounded-md">
  //         Muted Background
  //       </div>
  //       <div className="p-4 bg-destructive text-destructive-foreground rounded-md">
  //         Destructive Background
  //       </div>
  //       <div className="p-4 bg-card text-card-foreground rounded-md">
  //         Card Background
  //       </div>
  //     </div>
  //   </main>
  // );
}
